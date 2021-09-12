/**
 * All components related to interacting with quiz located here
 */
// react imports
import React, { useState, useEffect, useRef } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Spinner, Form, Button, Card } from 'react-bootstrap';
// api import
import { API } from '../api/Api.jsx';
// helper import
import { fileToDataUrl, updateQuestions } from '../helper.jsx';
// question page import
import { EditQuestionPage } from './Question.jsx';
import { CustomModal } from './Modal.jsx';
// style import
import { CardContainer, CardFlexBox } from '../styles/BrainStyle.jsx';
// no photo placeholder
import placeholderImage from '../assets/placeholderImage.jpeg';
// youtube placeholder
import youtubePlaceholderImage from '../assets/youtubePlaceholderImage.jpeg';
// import new question form
import { NewQuestionForm } from './ModularForm.jsx';
/**
 * Given required quizId and option questionId
 * will redirect to required page
 * Quiz or question edit pages
 * @param {JSONObject} props quizId and questionId
 * @returns JSXElement
 */
export function QuizPage (props) {
  const quizId = props.quizId;
  const questionId = props.questionId;
  // only edit question
  if (!questionId) {
    return (
      <EditQuizPage quizId={quizId}/>
    );
  // edit question
  } else {
    return (
      <EditQuestionPage quizId={quizId} questionId={questionId}/>
    );
  }
}

QuizPage.propTypes = {
  quizId: PropTypes.string.isRequired,
  questionId: PropTypes.string,
}
/**
 * Given props, will allow user to make changes to the quiz
 * Does not handle question editing but shows all questions!
 * Mainly used to edit name, thumbnail, adding and removing questions
 * as well as a link to edit a specific question
 * @param {JSON} props used to get url params. Only id is required
 * @returns JSXElement
 */
export function EditQuizPage (props) {
  const [quizData, setQuizData] = useState({});
  // sets loading as true to force the client to load in everything
  // prevents undefined for the other components
  const [loading, setLoading] = useState(true);
  const quizId = props.quizId;

  // gets all information required for quiz page
  const getQuizInfo = async () => {
    const response = await new API().getQuizById(quizId);
    if (response.status === 200) {
      setQuizData(response.data);
    } else {
      setQuizData(null);
    }
    // finished loading! can show the entire page
    setLoading(false);
  }

  useEffect(async () => {
    await getQuizInfo();
  }, [])

  // will redirect to not found page if there is no quiz existing
  return (
    <>
      {quizData === null && <Redirect to='/NotFound'/>}
      {loading
        ? <Spinner size='lg' animation='border'/>
        : <>
          <h1>Edit quiz <Link className='btn btn-link' to={'/dashboard'}>Back to dashboard</Link> </h1>
          <EditQuizForm quizData={quizData} quizId={quizId}/>
          </>
      }
    </>
  );
}

EditQuizPage.propTypes = {
  quizId: PropTypes.string.isRequired,
}

/**
 * Given an object with quiz data, will create a submittable form
 * that allows user to edit changes to name and thumbnail
 * @param {JSONObject} props QuizData to manipulate
 */
export function EditQuizForm (props) {
  const [deleted, setDeleted] = useState(false);
  const [editFormMessage, setEditFormMessage] = useState('');
  const [quizData, setQuizData] = useState(props.quizData);
  const quizId = props.quizId;
  // form validation
  const [isValidated, toggleValidated] = useState(false);
  // all modal stuff needed to open and close the modal
  const [showModal, setModal] = useState(false);
  const [toggle, setToggle] = useState(false);
  const firstUpdate = useRef(true);
  const [loading, setLoading] = useState(false);
  // all modal show stuff for new question
  const handleShowModal = () => {
    // reset modal to ensure it actually opens
    if (showModal) {
      setModal(false);
      setToggle(!toggle);
    // just show it
    } else {
      setToggle(!toggle);
    }
  }

  // toggles modal when toggle switch is flicked
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      setModal(!showModal);
    }
  }, [toggle])

  /**
   * Allows user to delete the entire quiz itself
   */
  const handleDelete = async () => {
    setEditFormMessage(<Spinner size='sm' animation='border'/>);
    const response = await new API().deleteQuizById(quizId);
    if (response.status === 200) {
      setDeleted(true);
      setEditFormMessage('');
    } else {
      setEditFormMessage('Could not delete. Error:', response.error);
    }
  }

  /**
   * Will handle all submit of the form.
   * Will check if all fields are valid and will then submit
   * @param {JSXEvent} e Submit event
   */
  const handleEditSubmit = async (e) => {
    const target = e.currentTarget;
    setLoading(true);
    e.preventDefault();
    if (target.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setEditFormMessage(<Spinner size='sm' animation='border'/>)
      // convert to base64 if there is an image
      let file = quizData.thumbnail;
      if (document.getElementById('editQuizFileInput').files[0]) {
        file = await fileToDataUrl(document.getElementById('editQuizFileInput').files[0]);
      }
      // ensure proper file is uploaded
      if (file === false) {
        setEditFormMessage('Invalid File upload!');
      } else {
        // send data to api
        const data = {
          name: document.getElementById('editQuizName').value,
          thumbnail: file,
          questions: quizData.questions,
        }
        // sending request
        const response = await new API().editQuizById(quizId, data);
        // success
        if (response.status === 200) {
          setQuizData(response.data);
          setEditFormMessage('');
        } else {
          // failed
          setEditFormMessage(response.data.error);
        }
      }
    }
    toggleValidated(true);
    setLoading(false);
  }

  const handleAddQuestionSubmit = async (e) => {
    e.preventDefault();
    const target = document.getElementById('newQuestionForm');
    // failed
    if (target.checkValidity() === false) {
      e.stopPropagation();
    // passed
    } else {
      // add new quiz. Null for not editing but pushing
      const response = await updateQuestions(quizId, quizData, null);
      // success and reload window
      if (response.status === 200) {
        setModal(false);
        setQuizData(response.data);
      // fail. print why in console.
      } else {
        console.log(response);
      }
    }
  };

  return (
    <>
      {(deleted || quizData === {}) && <Redirect to='/dashboard'/>}
      {showModal && <div onSubmit={handleAddQuestionSubmit}><NewQuestionModal quizId={quizId} quizData={quizData} show={showModal}/></div>}
      <Form noValidate validated={isValidated} onSubmit={handleEditSubmit} >
        <Form.Group controlId='editQuizName' >
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' defaultValue={quizData.name} required/>
          <Form.Control.Feedback type='invalid'>Please fill name field</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='editQuizThumbnail' >
          <Form.Label>Thumbnail</Form.Label>
          <Form.Text>
            {quizData.thumbnail === null
              ? <div className='mb-4'>No thumbnail uploaded </div>
              : <img className='mb-4 img-fluid rounded' style={{ maxHeight: '300px' }} src={quizData.thumbnail} alt='Quiz Thumbnail'/>}</Form.Text>
          <Form.Control id='editQuizFileInput' type='file' accept='image/*'/>
          <Form.Control.Feedback type='invalid'>Please upload a image file</Form.Control.Feedback>
        </Form.Group>
        <Button id='quizEditSubmitButton' className='mr-2' variant='primary' type='submit' disabled={loading}>Submit Changes</Button>
        <Button id='addQuestionButton' className='mr-2' variant='success' onClick={handleShowModal} disabled={loading}>Add Question</Button>
        <Button id='deleteQuizButton' variant='danger' onClick={handleDelete} disabled={loading}>Delete</Button>
        <span className='ml-3'>{editFormMessage}</span>
      </Form>
      <QuizQuestionList quizId={quizId} quizData={quizData.questions}/>
    </>
  )
}

EditQuizForm.propTypes = {
  quizData: PropTypes.object.isRequired,
  quizId: PropTypes.string.isRequired,
}

/**
 * Given props, will allow the user to create a new question
 * using a form shown through a modal
 * @param {object} props requires show, quizData and quizId
 * @returns JSXElement for creatign a new question
 */
export function NewQuestionModal (props) {
  // prevent default check behavior. Bootstrap's is nicer
  // Based on the default action provided by react-bootstrap
  return (
    <div>
      <CustomModal show={true} title="Creata a new question" content={<NewQuestionForm quizData={props.quizData} quizId={props.quizId}/>}/>
    </div>
  );
}

NewQuestionModal.propTypes = {
  quizData: PropTypes.object.isRequired,
  quizId: PropTypes.string.isRequired,
}

/**
 * Given a list of questions, will create a list for them
 * If the list is empty, will return will create a div saying no questions
 * @returns JSX Element
 */
export function QuizQuestionList (props) {
  const [quizQuestions, setQuizQuestions] = useState(props.quizData);
  const quizId = props.quizId;

  const handleDelete = async (e, questionId) => {
    e.preventDefault();
    // get quiz by id
    const quizData = await new API().getQuizById(quizId);
    if (quizData.status === 200) {
      // remove question from list
      quizData.data.questions.splice(parseInt(questionId, 10), 1);
      // put changes into backend
      const editResponse = await new API().editQuizById(quizId, quizData.data);
      // successful reload
      if (editResponse.status === 200) {
        setQuizQuestions(editResponse.data.questions);
      // failed
      } else {
        console.log(editResponse);
      }
    // failed
    } else {
      console.log(quizData);
    }
  }

  return (
    <>
      {(quizQuestions.length === 0)
        ? <span>This quiz has no questions. To create a new question, press the &apos;Add question&apos; button</span>
        : <CardFlexBox>
            {quizQuestions.map((question, index) => {
              return (<div key={index} onSubmit={(e) => handleDelete(e, index)}><QuestionCard questionId={index} quizId={quizId} questionData={question}/></div>);
            })}
          </CardFlexBox>
        }
    </>
  )
}

QuizQuestionList.propTypes = {
  quizData: PropTypes.array.isRequired,
  quizId: PropTypes.string.isRequired,
}

/**
 * Similar to quizCard but with functions for questions
 * Formatting is different to quiz card so created a new card specifically for it
 * Allows user to edit and delete the question
 * @param {Object} props requires questionId, questionData, quizId
 * @returns JSXelement for a question
 */
export function QuestionCard (props) {
  const questionData = props.questionData;
  const questionId = props.questionId;
  const quizId = props.quizId;

  return (
    <CardContainer className='m-4'>
      <Card className='mt-4' style={{ maxWidth: '300px', width: '38rem', minHeight: '400px' }}>
        {questionData.photo !== ''
          ? <Card.Img variant='top' style={{ minHeight: '165px' }} src={questionData.photo[0] === 'd' ? questionData.photo : youtubePlaceholderImage}/>
          : <Card.Img variant='top' style={{ minHeight: '165px' }} src={placeholderImage}/>
        }
        <Card.Body>
          <Card.Title>Question {questionId}</Card.Title>
          <Card.Text>{questionData.question}</Card.Text>
          <Link className='btn btn-primary mr-2' to={`/quiz/${quizId}/${questionId}`}>Edit</Link>
          <Form><Button type='submit' variant='danger'>Delete</Button></Form>
        </Card.Body>
      </Card>
    </CardContainer>
  );
}

QuestionCard.propTypes = {
  questionId: PropTypes.string.isRequired,
  questionData: PropTypes.object.isRequired,
  quizId: PropTypes.string.isRequired,

}
