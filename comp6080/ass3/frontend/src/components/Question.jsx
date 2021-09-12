/**
 * Contains all of the components required for question
 * Route related
 */
// react imports
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';

// helper import
import { getQuizDataById, updateQuestions } from '../helper.jsx';
// edit question form
import { NewQuestionForm } from './ModularForm.jsx';

/**
 * Given a questionid and quizid, will allow user to edit question fields
 * Updated question is sent through to helper function and put into the backend
 * @param {object} props requires quizId and quiz question
 * @returns JSXElement for page editing question
 */
export function EditQuestionPage (props) {
  const [loading, setLoading] = useState(true);
  const quizId = props.quizId;
  const questionId = props.questionId;
  const [quizData, setQuizData] = useState({});

  /**
   * When submitted, will check the validity of fields
   * if valid will update questions
   * @param {JSXEvent} e submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const target = document.getElementById('newQuestionForm');
    // failed
    if (target.checkValidity() === false) {
      e.stopPropagation();
    // passed
    } else {
      // editing so providing question id to indicate which one is being
      // edited
      const response = await updateQuestions(quizId, quizData, questionId);
      // success and reload window
      if (response.status === 200) {
        console.log(response, response.data);
        setQuizData(response.data);
      // fail. print why in console.
      } else {
        console.log(response);
      }
    }
  };

  // initialisation of the quiz data
  useEffect(async () => {
    const response = await getQuizDataById(quizId);
    if (response.status === 200) {
      setQuizData(response.data);
    } else {
      console.log(response);
    }
    setLoading(false);
  }, [])

  return (
    <>
      {(loading === true || quizData.questions.length === undefined)
        ? <><Spinner size='lg' animation='border'/></>
        : <>
            {(quizData.questions.length < parseInt(questionId, 10) + 1)
              ? <Redirect to='/NotFound'/>
              : <><h1>Editing question number: {questionId}<Link className='btn btn-link' to={`/quiz/${quizId}`}>Back</Link></h1><br/>
                <div onSubmit={handleSubmit}><NewQuestionForm quizId={quizId} quizData={quizData} questionId={questionId}/></div>
                </>}
        </>
      }
    </>
  );
}

EditQuestionPage.propTypes = {
  quizId: PropTypes.string.isRequired,
  questionId: PropTypes.string.isRequired,
}
