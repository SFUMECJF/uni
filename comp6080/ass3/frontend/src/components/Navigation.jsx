/**
 * Hub for every single component
 * All components centralise here for the router
 * to show them
 */

// react imports
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
// style imports
import { BrainTheme, FooterDiv, MainContent } from '../styles/BrainStyle.jsx';
// helper import
import { LogoutRemoveData } from '../helper.jsx';
// Main Componenets import
// Login
import { LoginForm, RegisterForm } from './Auth.jsx';
// dashboard
import { AdminDashboard } from './Dashboard.jsx';
// quiz page
import { QuizPage } from './Quiz.jsx';
// session
import { SessionPage } from './Session.jsx';
// join page
import { JoinPage } from './Join.jsx';
// play page
import { PlayPage } from './Play.jsx';
export function AppNav () {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/play/:sessionId' component={PlayTheme}/>
          <Route exact path='/join/:sessionId?' component={JoinTheme}/>
          <Route exact path='/dashboard'>
            <AdminTheme content={<AdminDashboard />} />
          </Route>
          <Route exact path='/login'>
            <UserTheme content={<LoginForm />} />
          </Route>
          <Route exact path='/register'>
            <UserTheme content={<RegisterForm />} />
          </Route>
          <Route path={'/quiz/:quizId/:questionId?'} component={QuizTheme}/>
          <Route path={'/session/:sessionId/'} component={SessionTheme}/>
          <Route exact path='/'>
            <Redirect to='/login'/>
          </Route>
          <Route>
            <UserTheme content={<h1>Page not found</h1>} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export function AdminTheme (props) {
  return (
    <>
      <BrainTheme>
        <AdminNavHeader />
          <MainContent>
            {props.content}
          </MainContent>
      </BrainTheme>
      <NavFooter />
    </>
  )
}

AdminTheme.propTypes = {
  content: PropTypes.node.isRequired,
}

export function UserTheme (props) {
  return (
    <>
      <BrainTheme>
        <UserNavHeader />
        <MainContent>
          {props.content}
        </MainContent>
      </BrainTheme>
      <NavFooter />
    </>
  );
}

UserTheme.propTypes = {
  content: PropTypes.node.isRequired,
}

export function QuizTheme (props) {
  return (
    <AdminTheme content={<QuizPage quizId={props.match.params.quizId} questionId={props.match.params.questionId}/>}/>
  );
}
QuizTheme.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      quizId: PropTypes.string.isRequired,
      questionId: PropTypes.string
    })
  })
}

export function SessionTheme (props) {
  return (
    <AdminTheme content={<SessionPage sessionId={props.match.params.sessionId} />}/>
  );
}
SessionTheme.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      sessionId: PropTypes.string.isRequired,
    })
  })
}

export function JoinTheme (props) {
  return (
    <UserTheme content={<JoinPage sessionId={props.match.params.sessionId}/>}/>
  );
}

JoinTheme.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      sessionId: PropTypes.string,
    })
  })
}

export function PlayTheme (props) {
  return (
    <UserTheme content={<PlayPage sessionId={props.match.params.sessionId}/>}/>
  );
}

PlayTheme.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      sessionId: PropTypes.string.isRequired,
    })
  })
}

/**
 * The main header utilised when you are logged in!
 * Also checks that the user is logged in and will redirect
 * if not logged in when they attempt to get into an admin page!
 * @returns JSXElement
 */
export function AdminNavHeader () {
  return (
    <Navbar bg='dark' variant='dark'>
      {localStorage.getItem('token') === null && <Redirect to='/login'/>}
      <h5>&#129504;BigBrain</h5>
      <Navbar.Collapse className='flex justify-content-end'>
        <Button id='adminNavDashboardButton' className='mr-2 btn' variant='primary' href="/dashboard">Dashboard</Button>
        <Button id='adminNavPlayButton' className='mr-2 btn' variant='primary' href="/join">Play</Button>
        <Button id='adminNavLogoutButton' className='mr-2 btn' variant='outline-danger' onClick={LogoutRemoveData} href="/login">Logout</Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

/**
 * The main element utilised for people that are NOT
 * logged in
 * @returns JSXElement
 */
export function UserNavHeader () {
  return (
    <Navbar bg='dark' variant='dark' >
      <h5>&#129504;BigBrain</h5>
      <Navbar.Collapse className='justify-content-end'>
        <Button id='userNavPlayButton' className='mr-2 btn' variant='primary' href="/join">Play</Button>
        <Button id='userNavLoginButton' className='mr-2 btn' variant='primary' href="/login">Login</Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

/**
 * The footer that is on all pages
 * @returns JSXElement
 */
export function NavFooter () {
  return (
    <FooterDiv>
      <Navbar fixed="bottom" bg='dark' variant='dark'>
        <NavbarCollapse className='justify-content-end'>
          <Button className='text-muted' variant='link'>Terms of use</Button>
        </NavbarCollapse>
      </Navbar>
    </FooterDiv>
  );
}
