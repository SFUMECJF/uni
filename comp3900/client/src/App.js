import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// Redux
import { connect } from 'react-redux';
// Pages
import { Login } from './pages/Login';
import Home from './pages/Home';
import Main from './pages/Main';
import Profile from './pages/Profile';
import TaskCreate from './pages/TaskCreate';
import TaskEdit from './pages/TaskEdit';
import PasswordReset from './pages/PasswordReset';
// Components
import styled from 'styled-components';
import Header from './components/Header'

const AppContainer = styled.div`  
  display: flex;
  min-height: 800px;
  width:100%;
  min-width: 1200px;
  flex-direction: column;
  align-items: center;
`

const mapStateToProps = ({ user }) => ({
  token: user.token
})

/**
 * App route controller which determines the 
 * routes that are available and the index pages to be rendered
 * Pages with param token require authentication to be accessed
 * 
 * @param {*} token - Authentication token of user
 */
function App({ token }) {
  return (
    <Router>
      <AppContainer>
        {token && <Header />}
        <Switch>
            <Route 
              path="/profile/:username"
              render={() => (
                <Profile token={token}/>
              )}
            />
            <Route exact path="/" component={Home}/>
            <Route
              path="/login"
              render={() => (
                <Login token={token} />
              )}
            />
            <Route
              path="/main"
              render={() => (
                <Main token={token} />
              )}
            />
            <Route 
              path="/passwordreset/:token"
              render={() => (
                <PasswordReset/>
              )}
            />
            <Route 
              path="/task/create"
              render={() => (
                <TaskCreate token={token}/>
              )}
            />
            <Route 
              path="/task/edit/:id"
              render={() => (
                <TaskEdit token={token}/>
              )}
            />
        </Switch>
      </AppContainer>
    </Router>
  );
}

export default connect(mapStateToProps, null)(App);
