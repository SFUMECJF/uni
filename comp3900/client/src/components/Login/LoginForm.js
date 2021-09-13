import React from 'react';
// Components
import styled from 'styled-components';
import Logo from '../Logo';
// Login form components
import LoginBody from './LoginForm/LoginBody';
import ResetPasswordBody from './LoginForm/ResetPasswordBody';
import SignUpBody from './LoginForm/SignUpBody';
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { CircularProgress } from '@material-ui/core';

// Styled components
export const LoginFormContainer = styled.div`
    width: 400px;
    background-color: white;
    box-shadow: 0px 7px 10px 1px rgba(0, 0, 0, 0.25);
    flex-direction: column;
    display: flex;
    align-items: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
    box-sizing: border-box;
`

export const LogoStyle = {
    height: '40px',
    width: '40px'
}

export const TitleStyle = {
    fontSize: "1.8em",
    marginRight: '0.5rem'
}


export const TextField = styled.input`
    border-radius: 5px;
    border: 1px solid #847F7F;
    width: 100%;
    height: 40px;
    font-size: 1.1em;
    padding-left: 1rem;
    box-sizing: border-box;
    margin-bottom: 1rem;
    border: ${props => props.error && "solid 1px red"};
`

export const Button = styled.button`
    outline: none;
    border: none;
    background-color: #007ABE;
    width: 120px;
    height: 35px;
    border-radius: 8px;
    color: white;
    font-size: 1em;
    cursor: pointer;
    margin-top: 0.5rem;

    &:hover {
        filter: brightness(0.9);
    }
`

export const Title = styled.h3`
    font-size: 600;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 1em;
`

export const Label = styled.label`
`

export const SubHeading = styled.p`
    margin-top: 0rem;
`

export const ButtonGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`

export const Link = styled.span`
    color: #007ABE;
    cursor: pointer;

    &:hover {
        filter: brightness(0.9);
        text-decoration: underline;
    }
`

export const TickIcon = styled(IoIosCheckmarkCircle)`
    color: green;
    width: 50px;
    height: 50px;
`

export const TickContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 2rem;
`

export const ErrorMessage = styled.span`
    color: red;
    margin-top: -0.5rem;
    font-size: 0.9em;
    margin-bottom: 0.5rem;
`

export const LoadingCircle = styled(CircularProgress)`
    margin-top: 1rem;
    margin-bottom: 1rem;
    && {
        color: #007ABE;
    }
`
/**
 * Main login form that renders different steps of the /login route
 * Users can either login, reset their password and register an account
 * on this component
 * @param {*} mode - reset, register and login are valid modes 
 * @param {*} setMode - sets the mode to the valid modes available
 */
const LoginForm = ({ mode, setMode }) => {

    const renderMode = () => {
        switch(mode) {
            case "reset":
                return <ResetPasswordBody
                    cancel={() => setMode('login')}
                />
            case "register":
                return <SignUpBody
                    cancel={() => setMode('login')}
                />
            default:
                return <LoginBody
                    reset={() => setMode('reset')}
                    register={() => setMode('register')}
                />
        }
    }

    return (
        <LoginFormContainer>
            <Logo
                style={LogoStyle}
                titleStyle={TitleStyle}
            />
            {renderMode()}
        </LoginFormContainer>
    )
}

export default LoginForm
