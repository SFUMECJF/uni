import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// Components
import styled from 'styled-components';
import { TextField, Button, Label, ErrorMessage, LoadingCircle } from '../LoginForm';
// Redux
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/features/userSlice';

// API
import { loginUser } from '../../../api/auth';
import { getUserDetails } from '../../../api/profile';

// Styled components
const LoginBodyContainer = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const InputGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const Divider = styled.hr`
    border: solid 1px rgba(0, 0, 0, 0.2);
    width: 100%;
    margin-top: 1.2rem;
`

const Link = styled.p`
    margin: 0.2rem;
    color: #007ABE;
    cursor: pointer;
    font-size: 0.9em;

    &:hover {
        text-decoration: underline;
    }

    &:active {
        filter: brightness(0.8);
    }
`

/**
 * Login form to login a user and access the software
 * @param {*} reset - Sets the mode to resetting the password
 * @param {*} register - Sets the mode to registering a new account
 */
const LoginBody = ({ reset, register }) => {

    // Login form fields
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        username: false,
        password: false,
        serverError: false
    });
    const [logging, setLogging] = useState(false);


    const dispatch = useDispatch();
    const history = useHistory();

    const resetErrors = () => {
        if (errors.username || errors.password || errors.serverError) {
            setErrors({
                username: false,
                password: false,
                serverError: false
            })
        }
    }

    // Handles the form changes
    const handleUsernameChange = (e) => {
        const name = e.target.value;

        resetErrors();

        if (name.length > 50) {
            return;
        }

        setUsername(name);
    }

    const handlePasswordChange = (e) => {
        const password = e.target.value;

        resetErrors();

        setPassword(password);
    }

    const handleLoginClick = async (e) => {

        setLogging(true);
        let usernameError = false;
        let passwordError = false;

        // Checks if the fields are in correct format
        if (username.length < 5) {
            usernameError = 'Username cannot be less than 5 characters';
        }

        if (password.length < 8) {
            passwordError = 'Password must be more than 8 characters';
        }

        if (usernameError || passwordError) {
            setLogging(false)
            setErrors({
                username: usernameError,
                password: passwordError
            })
            return;
        }

        // Logs in the user
        try {
            const response = await loginUser(username, password);
            const token = response.data.token;
            const id = response.data.id;

            const userDetailsResponse = await getUserDetails(token, username);
            const profilePicture = userDetailsResponse.data[0].profile_picture;

            // Stores the user's main details in localStorage
            window.localStorage.setItem('token', token);
            window.localStorage.setItem('username', username);
            window.localStorage.setItem('profilePicture', profilePicture);
            window.localStorage.setItem('id', id);
            // Also dispatches it into the global redux store
            dispatch(login({ token, username, profilePicture, id }));
;
            history.push('/main');

        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    const message = error.response.data.non_field_errors;
                    setErrors({
                        serverError: message
                    })
                } else {
                    alert(error);
                }
            }
            setLogging(false)
        }
    }

    // Submits the form if the user clicks the enter key
    const handleFieldKeyDown = (e) => {
        if (e.key === "Enter") {
            handleLoginClick();
        }
    }

    return (
        <LoginBodyContainer>
            <InputGroup>
                <Label htmlFor="Username">Username</Label>
                <TextField
                    value={username}
                    onChange={handleUsernameChange}
                    name="Username"
                    error={errors.username}
                    disabled={logging}
                    onKeyDown={handleFieldKeyDown}
                />
                {
                    errors.username &&
                    <ErrorMessage>
                        {errors.username}
                    </ErrorMessage>
                }
                <Label htmlFor="Password">Password</Label>
                <TextField
                    type="password"
                    onChange={handlePasswordChange}
                    name="Password"
                    error={errors.password}
                    disabled={logging}
                    onKeyDown={handleFieldKeyDown}
                />
                {
                    errors.password &&
                    <ErrorMessage>
                        {errors.password}
                    </ErrorMessage>
                }
                {
                    errors.serverError &&
                    <ErrorMessage>
                        {errors.serverError}
                    </ErrorMessage>
                }
            </InputGroup>
            {
                logging ?
                <LoadingCircle/>
                :
                <>
                    <Button type="submit" onClick={handleLoginClick}>
                        Login
                    </Button>
                    <Divider/>
                    <Link onClick={register}>
                        Don't have an account? Register here!
                    </Link>
                    <Link onClick={reset}>
                        Forgot password?
                    </Link>
                </>
            }

        </LoginBodyContainer>
    )
}

export default LoginBody;