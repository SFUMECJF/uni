/**
 * All components related to playing the game is located here
 */
// react imports
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Spinner } from 'react-bootstrap';
// api import
import { API } from '../api/Api.jsx';
// styles import
import { PlayGameContainer } from '../styles/BrainStyle.jsx';
// gif import
import waiting from '../assets/waiting.gif';

// main Play page. Will redirect to play game if given a session id as a prop
export function PlayPage (props) {
  const sessionId = props.sessionId;
  const [canPlay, toggleCanPlay] = useState(false);
  const [inLobby, toggleInlobby] = useState(true);
  const [checkPlay, setCheckPlay] = useState(false);
  const getGameStatus = async () => {
    const response = await new API().playerGetStatus(localStorage.getItem('playerId'));
    if (response.status === 200) {
      // only start the game if the game has been started!
      if (response.data.started) {
        clearInterval(checkPlay);
        toggleInlobby(false);
        toggleCanPlay(true);
      } else {
        console.log('Still waiting...');
      }
    } else {
      // can't play
      clearInterval(checkPlay);
      toggleInlobby(false);
      console.log(response.data.error);
    }
  }
  useEffect(async () => {
    const response = await new API().playerGetStatus(localStorage.getItem('playerId'));
    if (response.status === 200) {
      // initial status get
      if (response.data.started) {
        clearInterval(checkPlay);
        toggleInlobby(false);
        toggleCanPlay(true);
      } else {
        console.log('Still waiting...');
      }
      setCheckPlay(setInterval(getGameStatus, 5000));
    } else {
      // can't play
      clearInterval(checkPlay);
      toggleInlobby(false);
      console.log(response.data.error);
    }
    // cleanup
    return () => {
      clearInterval(checkPlay);
    }
  }, [])
  // ensure that the user has a valid player id
  return (
    <>
      {canPlay
        ? <><h1>Time to play game with session id: {sessionId}</h1><PlayGameContainer><PlayGame/></PlayGameContainer></>
        : <>{inLobby
          ? <> <h1>In lobby. Please wait until admin starts the quiz!</h1>
            <img alt='waiting logo' style={{ maxWidth: '300px' }} src={waiting}/>
          </>
          : <><h1>Game is already completed!!</h1></>
          }</>
      }
    </>
  )
}

PlayPage.propTypes = {
  sessionId: PropTypes.string.isRequired,
}

/**
 * the main play game!!!!
 */
export function PlayGame () {
  const [questionData, setQuestionData] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [checkQuestionInterval, setCheckQuestionInterval] = useState(null);
  useEffect(async () => {
    const response = await new API().playerGetQuestion();
    if (response.status === 200) {
      setQuestionData(response.data.question);
    } else {
      // quiz has been been completed!
      console.log('completed');
      setIsPlaying(false);
      clearInterval(checkQuestionInterval);
    }
  }, [])

  useEffect(async () => {
    setCheckQuestionInterval(setInterval(async () => {
      const response = await new API().playerGetQuestion();
      if (response.status === 200) {
        if (JSON.stringify(response.data.question) !== JSON.stringify(questionData)) {
          console.log('update');
          setQuestionData(response.data.question);
          // reset question
        }
      } else {
        // quiz has been been completed!
        setQuestionData(false);
        setIsPlaying(false);
        clearInterval(checkQuestionInterval);
      }
    }, 5000));
    return clearInterval(checkQuestionInterval);
  }, [questionData])

  return (
    <>
      {(isPlaying && questionData)
        ? <div><PlayGameScreen questionData={questionData} /></div>
        : <>{(!isPlaying)
          ? <><h1>Quiz is finished! Results are below!</h1><div><PlayGameResult /></div></>
          : <Spinner size='lg' animation='border'/>
          }</>
      }
    </>
  );
}

/**
 * Given question data, will create a question card for the user to interact with
 * and send their answers
 * @param {object} props questionData
 * @returns JSX ELEMENT
 */
export function PlayGameScreen (props) {
  const questionData = props.questionData;
  const [counter, setCounter] = useState(props.questionData.duration);
  const [counterInterval, setCounterInterval] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [loading, setLoading] = useState(false);
  // create a new counter when the question changes
  useEffect(() => {
    clearInterval(counterInterval);
    setAnswered(false);
    setCounter(questionData.duration);
    setCounterInterval(setInterval(() => {
      setCounter((counter) => counter - 1);
    }, 1000));
  }, [questionData]);

  // reset timer
  useEffect(() => {
    if (counter <= 0) {
      console.log('done!');
      handleQuestionDone();
    }
  }, [counter]);
  // shows the answer after the timer is up!
  const handleQuestionDone = async () => {
    setLoading(true);
    const response = await new API().playerGetAnswer();
    if (response.status === 200) {
      setAnswered(response.data);
      clearInterval(counterInterval);
    } else {
      // stop playing. Session was stopped
      console.log(response);
    }
    setLoading(false);
  }

  // handles when any checkbox is changed
  // gets the selected answer and sends it to the backend for submission
  const handleAnswerChange = async () => {
    const userAnswers = [];
    // loop to get user checked answers
    for (let i = 0; i < 4; i++) {
      if (document.getElementById('questionUserAnswer' + i.toString()).checked) {
        userAnswers.push(i);
      }
    }
    const response = await new API().playerAddAnswer(userAnswers);
    if (response.status !== 200) {
      console.log(response.data.error);
    }
  }

  return (
    <> {!questionData
      ? <><h1>Quiz is finished! Results are below!</h1><div><PlayGameResult /></div></>
      : <>
        {!loading && questionData
          ? <>{!answered
            ? <Form id='playGameForm'>
            <h5>{questionData.question}</h5><span>Time left: {counter}</span>
              <Form.Text>Points: {questionData.pointValue}</Form.Text>
              <>{questionData.photo !== '' &&
                <> {questionData.photo[0] === 'd'
                  ? <img className='mb-4 img-fluid rounded' style={{ maxHeight: '300px' }} src={questionData.photo} alt='Quiz Thumbnail'/>
                  : <iframe width="640" height="360" src={questionData.photo} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  }</>
              }</>
              <Form.Group controlId={'questionUserAnswer'} onChange={handleAnswerChange}>
              {questionData.type === 'radio' ? <Form.Label>Please select one</Form.Label> : <Form.Label>Please select the correct answers</Form.Label>}
                <Col sm={10}>
                  {questionData.userAnswers.map((userAnswer, index) => {
                    return (
                      <Form.Check
                        key={index}
                        type={questionData.type}
                        label={userAnswer}
                        name={'questionUserAnswer'}
                        id={'questionUserAnswer' + index.toString()}
                        required={questionData.type === 'radio' ? 'required' : ''}
                      />
                    );
                  })}
                </Col>
              </Form.Group>
            </Form>
            : <>
              <><h5>The answer was...</h5>
                <ul>
                {answered.answerIds.map((answer, index) => {
                  return (<li key={index}>{questionData.userAnswers[parseInt(answer, 10)]}</li>);
                })}</ul>
                <span>Please wait until admin advances to next question</span>
              </>
            </>
          }</>
          : <Spinner size='lg' animation='border'/>
        }</>
      }</>
  );
}
PlayGameScreen.propTypes = {
  questionData: PropTypes.object.isRequired,
}

/**
 * Will show the players result.
 * Used as a component to replace PlayGameScreen after completion!
 * @returns JSXElement
 */
export function PlayGameResult () {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);

  // get the final results!
  useEffect(async () => {
    const response = await new API().playerGetResults();
    setLoading(true);
    if (response.status === 200) {
      setResults(response.data);
    } else {
      console.log(response.data.error);
    }
    setLoading(false);
  }, [])

  return (
    <>
      {!loading
        ? <ol>
          {results.map((result, index) => {
            return (<li key={index}>Question {index}: {result.correct ? 'Correct!' : 'Incorrect!' }</li>);
          })}
        </ol>
        : <h5><Spinner size='lg' animation='border'></Spinner>Loading...</h5>}
    </>
  );
}
