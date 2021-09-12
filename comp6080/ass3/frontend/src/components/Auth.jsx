/**
 * Handles login, register pages
 */
// react imports
import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
// style import
import { AuthFormDiv } from '../styles/BrainStyle.jsx'
// modal import
import { CustomModal } from './Modal.jsx';
// api import
import { API } from '../api/Api.jsx';

/**
 * Login form component
 * Handles all functions for user login
 * @returns JSX Element
 */
export function LoginForm () {
  // handles all modal content and show
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  // only will trigger once to log in
  const [redirect, toggleRedirect] = useState(localStorage.getItem('token') !== null);
  // validation for form
  const [isValidated, setValidation] = useState(false);

  /**
   * When submitted will attempt to log in
   * @param {event} e submit event
   */
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const target = e.currentTarget
    if (target.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // reset modal
      setShow(false);
      const fields = {
        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value,
      }
      setLoading(true);
      const response = await new API().adminAuth('login', fields);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        toggleRedirect(true);
      } else {
        setTitle('Error!');
        setContent(response ? response.data.error : 'Timeout');
        setShow(true);
      }
      setLoading(false);
    }
    setValidation(true);
  }

  return (
    <AuthFormDiv>
      { redirect && <Redirect to='/dashboard'/> }
      { show && <CustomModal show={show} title={title} content={content}/> }
      <Form noValidate validated={isValidated} onSubmit={handleLoginSubmit}>
        <h1 className='mb-4'>Login</h1>
        <Form.Group controlId='loginEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' placeholder='Please enter your email address' required/>
          <Form.Control.Feedback type='invalid'>Please enter a valid email</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-4' controlId='loginPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Please enter your password' required/>
          <Form.Control.Feedback type='invalid'>Please enter password</Form.Control.Feedback>
        </Form.Group>
        <Button variant='primary' id='loginSubmit' type='submit' disabled={loading}>{loading ? <Spinner size='sm' animation='border'/> : 'Log In'} </Button>
        <a className='btn text-muted' id='toRegisterButton' href='/register'>Don&apos;t have an account?</a>
      </Form>
    </AuthFormDiv>
  );
}

/**
 * Register form
 * Handles all things about registering
 * @returns JSX Element
 */
export function RegisterForm () {
  // handles all modal content and show
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(null);
  // only will trigger once to log in
  const [redirect, toggleRedirect] = useState(false);
  // validation for form
  const [isValidated, setValidation] = useState(false);
  // invalid password hceck
  const [invalidConfirm, setInvalidConfirm] = useState(false);
  /**
   * When form is submitted, will check if
   * it is valid, if the register is okay
   * and if it is okay, then will redirect to login page
   * @param {event} e submit event
   */
  const handleRegister = async (e) => {
    e.preventDefault();
    setInvalidConfirm(false);
    const target = e.currentTarget;
    if (target.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setShow(false)
      const registerPassword = document.getElementById('registerPassword').value;
      const registerConfirmPassword = document.getElementById('registerConfirmPassword').value;
      if (registerPassword === registerConfirmPassword) {
        const fields = {
          email: document.getElementById('registerEmail').value,
          password: registerPassword,
          name: document.getElementById('registerUsername').value,
        }
        const response = await new API().adminAuth('register', fields);
        console.log(response);
        if (response.status === 200) {
          toggleRedirect(true);
        } else {
          setTitle('Error!');
          setContent(response.status ? response.data.error : 'Network time out');
          setInvalidConfirm(true);
        }
      } else {
        setInvalidConfirm(true);
      }
    }
    setValidation(true);
  }

  return (
    <AuthFormDiv>
      { redirect && <Redirect to='/login'/> }
      { show && <CustomModal show={show} title={title} content={content}/> }
      <Form noValidate validated={isValidated} onSubmit={handleRegister}>
        <h1>Register a new account</h1>
        <Form.Group controlId='registerEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' placeholder='Email address' required/>
          <Form.Control.Feedback type='invalid'>Please enter a valid email address</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='registerPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' required/>
          <Form.Control.Feedback type='invalid'>Please enter a password</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='registerConfirmPassword'>
          <Form.Label>Confirm password</Form.Label>
          <Form.Control type='password' placeholder='Confirm password' required/>
          <Form.Control.Feedback type='invalid'>Please confirm your password</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-4' controlId='registerUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' placeholder='Username' required/>
          <Form.Control.Feedback type='invalid'>Please enter a username</Form.Control.Feedback>
        </Form.Group>
        <Button id='registerSubmit' variant='primary' type='submit'>Register</Button>
        <a className='btn text-muted' href='/login'>Back</a>
        { invalidConfirm && <h5 style={{ color: 'red' }}>User already exist. Please try new details.</h5>}
      </Form>
    </AuthFormDiv>
  );
}
