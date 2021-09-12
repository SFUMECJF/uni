/**
 * All components related to joining the game is located here
 */
// react imports
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Form, Spinner } from 'react-bootstrap';
import { API } from '../api/Api.jsx';

// main Join page
export function JoinPage (props) {
  return (
    <>
      <h1>Time to play! Enter your name and session id below!</h1>
      <JoinForm sessionId={props.sessionId} />
    </>
  )
}

JoinPage.propTypes = {
  sessionId: PropTypes.string,
}

/**
 * On submit, will redirect the player to play the game IF they have attempted
 * To join a legitimate game
 * @returns a form to join a game
 */
export function JoinForm (props) {
  const [isValidated, setValidation] = useState(false);
  const [redirect, toggleRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  // toggles validation to allow submit somewhere else
  const toggleValidate = () => {
    setValidation(true);
  }

  // handles redirecting the player
  // sets the playerid to localstorage
  // meaning that this will refresh every time the player attempts to join a quiz
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const target = e.currentTarget;
    if (target.checkValidity() === false) {
      e.stopPropagation()
    } else {
      const sessionId = document.getElementById('joinNewSessionId').value;
      const playerName = document.getElementById('joinSessionName').value
      const response = await new API().playerJoin(sessionId, playerName);
      if (response.status === 200) {
        localStorage.setItem('playerId', response.data.playerId);
        toggleRedirect(sessionId);
      } else {
        setNotFound(true);
        console.log(response);
      }
    }
    setValidation(true);
    setLoading(false);
  }

  return (
    <> {redirect && <Redirect to={`/play/${redirect}`}/>} {!loading && <>
      <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
        <Form.Group controlId='joinSessionName'>
        <Form.Label>Name</Form.Label>
        <Form.Control type='text' placeholder='Enter your name' required/>
        <Form.Control.Feedback type='invalid'>Please enter your name</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='joinNewSessionId'>
        <Form.Label>Session Id (number)</Form.Label>
        <Form.Control type='number' placeholder='Enter session Id ' defaultValue={props.sessionId} required/>
        <Form.Control.Feedback type='invalid'>Please enter a session ID</Form.Control.Feedback>
        </Form.Group>
        <Button type='submit' onClick={toggleValidate} disabled={loading}>Join!{loading && <Spinner size='sm' animation='border'/>}</Button>
        {notFound && <span className='ml-3' style={{ color: 'red' }}>Session not found</span>}
      </Form>
    </>} </>
  );
}

JoinForm.propTypes = {
  sessionId: PropTypes.string,
}
