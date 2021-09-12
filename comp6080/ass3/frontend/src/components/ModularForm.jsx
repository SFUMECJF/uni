/**
 * All modular forms are here
 */
// react imports
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Col, Button, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { fileToDataUrl, getQuizDataById, updateQuestions } from '../helper.jsx';

/**
 * Form to create/edit a question
 * Automatically enables validation when the submit button is clicked!
 * @returns JSX element
 */
export function NewQuestionForm (props) {
  const [answerType, setAnswerType] = useState('radio');
  const [isValidated, toggleValidated] = useState(false);
  const [isEditing, toggleEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const validateAnswers = () => {
    toggleValidated(true);
  }

  /**
   * Changes the answer type based on the switch
   * Called every time it changes so it changes the type of answer
   * types selected
   */
  const changeAnswerType = () => {
    if (document.getElementById('newQuestionType').value === 'checkbox') {
      setAnswerType('checkbox');
    } else {
      setAnswerType('radio');
    }
  }

  // possible quiz data
  const [duration, setDuration] = useState(30);
  const [question, setQuestion] = useState('');
  const [pointValue, setPointValue] = useState(1);
  const [userAnswers, setUserAnswers] = useState(['', '', '', '']);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  // let correctAnswers = [];
  // user wants to edit
  useEffect(async () => {
    const response = await getQuizDataById(props.quizId);
    if (props.questionId !== undefined && response.status === 200) {
      const questionData = response.data.questions[parseInt(props.questionId, 10)];
      setDuration(questionData.duration);
      setQuestion(questionData.question);
      setPointValue(questionData.pointValue);
      setUserAnswers(questionData.userAnswers);
      setCorrectAnswers(questionData.correctAnswers);
      setAnswerType(questionData.type);
      // correctAnswers = questionData.correctAnswers;
      // photo base64
      /*
      if (questionData.photo[0] === 'd' || questionData.photo === '') {
        setPhotoType('file');
      } else {
        setPhotoType('checkbox');
      }
      */
      toggleEditing(true);
    }
    setLoading(false);
  }, [])

  // actual form shown will depend whether or not the user wants to edit or not
  // will allow the user to add an optional question image/video content if the user is editing
  return (
    <> {!loading
      ? <>
        {isEditing && <><h3>Image/Video Content: </h3><QuestionEditImageForm questionId={props.questionId} quizData={props.quizData} quizId={props.quizId}/></>}
        <h3>Edit Question Details:</h3>
        <Form noValidate validated={isValidated} id='newQuestionForm'>
          <Form.Group controlId='newQuestionType'>
            <Form.Label>Question Type</Form.Label>
            <Form.Control value={answerType} as='select' onChange={changeAnswerType}>
              <option value ='radio' >Single Choice</option>
              <option value ='checkbox' >Multiple Choice</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='newQuestionName'>
            <Form.Label>Your question</Form.Label>
            <Form.Control type='text' defaultValue={question} placeholder='Enter your question!' required/>
            <Form.Control.Feedback type='invalid'>Please enter a question</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId='newQuestionPointValue'>
            <Form.Label>Points value </Form.Label>
            <Form.Control type='number' defaultValue={pointValue} placeholder='Point Value'/>
          </Form.Group>
          <Form.Group controlId='newQuestionTimeLimit'>
            <Form.Label>Time Limit (seconds) </Form.Label>
            <Form.Control type='number' min={15} defaultValue={duration} placeholder='Time limit'/>
          </Form.Group>
          {['1', '2', '3', '4'].map((number, index) => {
            return (
            <>
              <Form.Group key={index} controlId={'newQuestionAnswer' + index.toString()}>
                <Form.Label>User Answer {index}</Form.Label>
                <Form.Control as='textarea' defaultValue={userAnswers[index]}placeholder={'Please enter answer for selection ' + number} rows={2} required/>
                <Form.Control.Feedback type='invalid'>Please enter an answer for selection {index}</Form.Control.Feedback>
              </Form.Group>
            </>);
          })}
          <fieldset>
            <Form.Group controlId={'newQuestionRealAnswers'}>
              <Form.Label>Please select the correct answer/s</Form.Label>
              <Col sm={10}>
                {answerType === 'radio' && <Form.Text>Please select one</Form.Text>}
                {['1', '2', '3', '4'].map((number, index) => {
                  return (<>
                    <Form.Check
                      key={index}
                      type={answerType}
                      label={'Option ' + index}
                      name={'newQuestionRealAnswer'}
                      defaultChecked = {correctAnswers.includes(index) && 'checked'}
                      id={'newQuestionRealAnswers' + index.toString()}
                      required={answerType === 'radio' ? 'required' : ''}
                    /></>
                  );
                })}
              </Col>
            </Form.Group>
          </fieldset>
          <Button variant='primary' onClick={validateAnswers} type='submit'>Submit</Button><Link className='btn btn-link' to={`/quiz/${props.quizId}`}>Back</Link>
        </Form>
      </>
      : <Spinner size='lg' animation='border'/>
    }
    </>
  );
}

NewQuestionForm.propTypes = {
  quizData: PropTypes.object.isRequired,
  quizId: PropTypes.string.isRequired,
  questionId: PropTypes.string,
}

/**
 * Independant form that is not coupled with any SUBMITS
 * SHOULD NOT BE LISTENED TO FOR SUBMITS EITHER THERE ARE NONE!
 * Given props will update a question's photo
 * @param {object} props requires questiondata, questionid and quizid
 * @returns
 */
export function QuestionEditImageForm (props) {
  const [quizData, setQuizData] = useState(props.quizData);
  const [photoType, setPhotoType] = useState('file');
  const [failMessage, setFailMessage] = useState('');
  const [isValidated, setValidation] = useState(false);
  const [loading, setLoading] = useState(false);
  const questionId = props.questionId;
  const quizId = props.quizId;

  /**
   * Assuming that the required input has been gotten
   * Gets the value and attempts to put in via the API
   * @param {JSXEvent } e submit event
   */
  const handleSubmit = async () => {
    setLoading(true);
    const target = document.getElementById('editQuestionPhotoForm');
    if (target.checkValidity() !== false) {
      const photoData = document.getElementById('newQuestionPhotoInput');
      // change photo to new photo
      // is a embed link
      const newQuizData = quizData;
      if (photoData.files === null) {
        newQuizData.questions[questionId].photo = photoData.value;
      // is image file
      } else {
        const newPhotoData = await fileToDataUrl(photoData.files[0]);
        newQuizData.questions[questionId].photo = newPhotoData;
      }

      // update questions
      const response = await updateQuestions(quizId, newQuizData, questionId);
      // success
      if (response.status === 200) {
        console.log(response.data);
        setQuizData(response.data);
      } else {
        setFailMessage(response.data.error);
      }
    }
    setValidation(true);
    setLoading(false);
  }

  // changes the photo type between file and url
  // called when the switch changes
  const changePhotoType = () => {
    if (!document.getElementById('photoSwitch').checked) {
      setPhotoType('file');
    } else {
      setPhotoType('url');
    }
  }

  useEffect(async () => {
    const response = await getQuizDataById(quizId);
    if (response === 200) {
      setQuizData(response.data)
    } else {
      console.log(response.error);
    }
  }, [])

  return (
    <Form id='editQuestionPhotoForm' noValidate validated={isValidated}>
      {failMessage !== '' && <h5>{failMessage}</h5>}
      <Form.Group controlId='newQuestionPhotoInput'>
        <Form.Text>
          {quizData.questions[questionId].photo === ''
            ? <div className='mb-4'>No thumbnail uploaded </div>
            : <> {quizData.questions[questionId].photo[0] === 'd'
              ? <img className='mb-4 img-fluid rounded' style={{ maxHeight: '300px' }} src={quizData.questions[questionId].photo} alt='Quiz Thumbnail'/>
              : <iframe width="640" height="360" src={quizData.questions[questionId].photo} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              }</>
          }
        </Form.Text>
        <Form.Label>To edit, upload a photo/youtube embed url below:</Form.Label>
        <Form.Check type='switch' id='photoSwitch' label={photoType} onChange={changePhotoType}/>
        <Form.Control className='mt-2' type={photoType} accept={photoType === 'file' ? 'image/*' : ''} placeholder={photoType === 'url' ? 'Paste your url here' : ''} required/>
        <Form.Control.Feedback type='invalid'>Please ensure your input is correct</Form.Control.Feedback>
      </Form.Group>
      <Button className='mb-4' variant='primary' onClick={handleSubmit} disabled={loading}>Change image/video</Button>
    </Form>
  );
}

QuestionEditImageForm.propTypes = {
  questionId: PropTypes.string.isRequired,
  quizData: PropTypes.object.isRequired,
  quizId: PropTypes.string.isRequired,
}
