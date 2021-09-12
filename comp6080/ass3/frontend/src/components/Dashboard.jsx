/**
 * Main file for all dashboard related things
 */

// react imports
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Form, Spinner, NavDropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
// helper imports
import { GetQuizArray, getQuizDataById, getQuizDuration } from '../helper.jsx'
// styles
import { DashboardDiv, CardFlexBox, CardContainer } from '../styles/BrainStyle.jsx';
// modal import
import { CustomModal } from './Modal.jsx';
// API import
import { API } from '../api/Api.jsx';
// placeholder image
import placeholderImage from '../assets/placeholderImage.jpeg';

/**
 * Main dashboard element
 * @returns JSX Element
 */
export function AdminDashboard () {
  return (
      <DashboardDiv>
        <QuizList />
      </DashboardDiv>
  );
}

/**
 * Creates a new container will all of the quiz cards.
 * So see what the quiz cards can do, go to the QuizCard component
 * @returns A flex box with all of the quiz cards
 */
export function QuizList () {
  const [quizzes, setQuizzes] = useState([]);
  const [showModal, setModal] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const firstUpdate = useRef(true);

  const handleShowModal = () => {
    setModalMessage(null);
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
   * When form on modal is submitted,
   * will mutate the quizes to get it to reload
   * @param {event} e submit event
   */
  const createQuiz = async (e) => {
    e.preventDefault();
    setModalMessage(<Spinner size='sm' animation='border'/>);
    const response = await new API().newQuiz({ name: (document.getElementById('createQuizName').value), });
    if (response.status === 200) {
      // close modal
      setModalMessage(null);
      setModal(false);
      // mutates the quiz to get it to reload
      const response = await GetQuizArray();
      setQuizzes(response.data.quizzes);
    } else {
      setModalMessage(<span className='ml-2'>{response.data.error}</span>);
    }
  }

  // set initial quizzes
  useEffect(async () => {
    setLoading(true);
    const response = await GetQuizArray();
    if (response.status === 200) {
      setQuizzes(response.data.quizzes);
    } else {
      console.log(response);
    }
    setLoading(false);
  }, []);

  return (
    <>
      {(quizzes.length === 0 && !loading)
        ? <div onSubmit={createQuiz}>
            <h1>You have no quizzes</h1>
            <div className='m-4'>Click below to create your first quiz! </div>
            <Button id='createAQuizButton' variant='primary' onClick={handleShowModal}>Create a quiz</Button>
            {showModal && <CreateQuizModal message={modalMessage} />}
          </div>
        : <div onSubmit={createQuiz}>
            <h1 className='mb-4'>Your quizzes</h1>
            <Button id='createAQuizButton' className='mb-4' variant='primary' onClick={handleShowModal}>Create a quiz</Button>
            {showModal && <CreateQuizModal message={modalMessage} />}
            {loading
              ? <><br/> <Spinner size='lg' animation='border'/></>
              : <CardFlexBox>
                  {quizzes.map((quiz, index) => {
                    return (<QuizCard key={index} quizId={quiz.id}/>);
                  })}
                </CardFlexBox>
            }
        </div>
        }
    </>
  );
}

/**
 * A card for every quiz
 * Allows user to edit quiz and start/stop the quiz
 * @returns JSX Element
 */
export function QuizCard (props) {
  const [quizData, setQuizData] = useState({});
  const quizId = props.quizId;
  const [session, setLastSession] = useState('');
  // modal show, toggle and first ref
  const [showModal, setModal] = useState(false);
  const [toggle, setToggle] = useState(false);
  const firstUpdate = useRef(true);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const toggleModal = () => {
    // reset modal to ensure it actually opens
    if (showModal) {
      setModal(false);
      setToggle(!toggle);
    // just show it
    } else {
      setToggle(!toggle);
    }
  }

  // get's initial quiz data via the id passed through params
  useEffect(async () => {
    setLoading(true);
    const response = await getQuizDataById(quizId);
    if (response.status === 200) {
      setQuizData(response.data);
    } else {
      console.log(response.data.error);
    }
    setLoading(false);
  }, [])
  /**
   * Starts/stops quiz based !quizData.active
   */
  const handleStopStart = async () => {
    setLoading(true);
    if (quizData.active === null) {
      const response = await new API().startQuizById(quizId);
      if (response.status === 200) {
        setCurrentQuestion(0);
        setQuizData(response.data);
        setLastSession(response.data.active);
        toggleModal();
      } else {
        console.log(response.data.error)
      }
    } else {
      const response = await new API().stopQuizById(quizId);
      if (response.status === 200) {
        toggleModal();
        setQuizData(response.data);
        console.log(response.data.active);
      } else {
        console.log(response.data);
      }
    }
    setLoading(false);
  }
  // toggles modal when toggle switch is flicked
  useEffect(() => {
    // don't open on first load please
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      setModal(!showModal);
    }
  }, [toggle])

  // function to copy link to user clipboard
  const handleCopySessionLink = () => {
    const tempSessionId = document.createElement('textarea');
    tempSessionId.value = 'http://localhost:3000/join/' + quizData.active;
    document.body.appendChild(tempSessionId);
    tempSessionId.select();
    document.execCommand('copy');
    setCopied(true);
    document.body.removeChild(tempSessionId);
  }

  const handleAdvanceQuestion = async () => {
    setLoading(true);
    setLastSession(quizData.active);
    const response = await new API().advanceQuizById(quizId);
    if (response.status === 200) {
      setCurrentQuestion((currentQuestion) => currentQuestion + 1);
    } else {
      console.log(response);
    }
    setLoading(false);
  }

  // show that the quiz is now finished
  useEffect(async () => {
    // session ended
    if (quizData.questions && currentQuestion >= quizData.questions.length) {
      console.log('finished!');
      const response = await new API().getQuizById(quizId);
      if (response.status === 200) {
        toggleModal();
        setQuizData(response.data);
      } else {
        console.log(response.data.error);
      }
    }
  }, [currentQuestion])
  // using inline styles to set size of card.
  return (
    <>
      <CardContainer className='m-4'>
        {(showModal && quizData.active && currentQuestion === 0) && <StartSessionModal session={quizData.active} />}
        {(showModal && !quizData.active) && <CustomModal show={true} title='Quiz Stopped' content={<>The Quiz has been stopped. Would you like to view results?<Button id='toResultsPageButton' href={`/session/${session}`}>View Results</Button></>}/>}
        <Card style={{ maxWidth: '325px', width: '38rem' }}>
          { quizData.thumbnail !== null
            ? <Card.Img variant='top' height='200px' width='100%' src={quizData.thumbnail} alt='quiz thumbnail'/>
            : <Card.Img varaint='top' height='200px' width='100%' src={placeholderImage} alt='placeholder thumbnail'/>}
          <Card.Body>
            <Card.Title>Quiz name: {quizData.name}</Card.Title>
            <Card.Subtitle className='text-muted small mb-2'>Created: {quizData.createdAt}</Card.Subtitle>
            <Card.Text>Owned by: {quizData.owner} </Card.Text>
            <Card.Text>Quiz ID: {quizId} </Card.Text>
            {quizData.oldSessions && <>
              {quizData.oldSessions.length !== 0 && <NavDropdown title="Previous Sessions" id="basic-nav-dropdown">
                {quizData.oldSessions.map((oldSession, index) => {
                  return (<NavDropdown.Item key={index} href={`/session/${oldSession}`}>Session: {oldSession} </NavDropdown.Item>);
                })}
              </NavDropdown>
              }</>
            }
            <Card.Text>Total questions: {quizData.questions ? quizData.questions.length : 'Cannot retrieve questions'} </Card.Text>
            <Card.Text>Duration: {quizData.questions ? getQuizDuration(quizData.questions) + ' seconds' : 'Cannot retrieve questions'} </Card.Text>
            <>{quizData.active &&
              <>
                <Card.Text>Current Question: {currentQuestion === -1 || currentQuestion >= quizData.questions.length ? 'Not started' : currentQuestion + 1}</Card.Text>
                <Card.Text>Session ID: {quizData.active}<Button className='ml-2' variant='secondary' size="sm" onClick={handleCopySessionLink}>{copied ? 'Copied!' : 'Copy Link'}</Button></Card.Text>
              </>
            }</>
            <Link id={'editQuizButton'} className='btn btn-outline-primary mr-2' to={`/quiz/${quizId}`} disabled={loading}>Edit</Link>
            <Button id={'startStopSessionButton'} className='mr-2' onClick={handleStopStart} variant={quizData.active ? 'warning' : 'success'} disabled={loading}>{quizData.active ? 'Stop Session' : 'Start Session'}</Button>
            <>{quizData.active && <Button onClick={handleAdvanceQuestion} disabled={loading}>Advance</Button>}</> {loading ? <Spinner size='sm' animation='border'/> : ''}
          </Card.Body>
        </Card>
      </CardContainer>
  </>
  );
}

QuizCard.propTypes = {
  quizId: PropTypes.number.isRequired,
}

/**
 * Creates a new quiz modal
 * @param {object} props Requires quiz message for errors
 * @returns JSXElement for modal
 */
export function CreateQuizModal (props) {
  const NewQuizForm = () => {
    return (
      <>
        <Form>
          <Form.Group controlId='createQuizName'>
            <Form.Label>Quiz Name</Form.Label>
            <Form.Control type='text' placeholder='Enter your quiz name' required/>
            <Form.Control.Feedback type='invalid'>
              Please enter a quiz name
            </Form.Control.Feedback>
          </Form.Group>
          <Button id='createQuizModalSubmit' variant='primary' type='submit'>Create</Button> {props.message}
        </Form>
      </>
    );
  }
  return (
    <CustomModal show={true} title='Create a new quiz!' content={<NewQuizForm/>}/>
  );
}

CreateQuizModal.propTypes = {
  message: PropTypes.element,
}

export function StartSessionModal (props) {
  const session = props.session;
  const [copied, setCopied] = useState(false);

  const handleCopySession = () => {
    const sessionLink = document.getElementById('sessionLink');
    sessionLink.select();
    document.execCommand('copy');
    setCopied(true);
  }

  return (
    <CustomModal show={true} title='Started quiz!'
      content={
          <>
          <h5>Session ID: {session}</h5>
          Quiz link below:
          <Form.Control id='sessionLink' value={`http://localhost:3000/join/${session}`} readOnly/>
          <Button onClick={handleCopySession}>{copied ? 'Copied!' : 'Copy'}</Button>
          </>
        }/>
  );
}

StartSessionModal.propTypes = {
  session: PropTypes.string.isRequired,
}
