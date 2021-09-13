import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
// Components
import { TextField, Button } from '../../LoginForm';
import styled from 'styled-components';
import {
    SubHeading,
    ButtonGroup,
    Link,
    TickIcon,
    TickContainer,
    ErrorMessage,
    LoadingCircle,
} from '../../LoginForm';
// API
import { changeUserPassword, sendResetPasswordEmail } from '../../../../api/auth';


const LoadingContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`
/**
 * In this step, users enter their email to reset the password
 * @param {*} cancel - Reverts back to login mode
 * @param {*} nextStep - Progresses to next step
 * @param {*} setUserEmail - Sets the user email to be used in next steps
 */
export const StepOne = ({ cancel, nextStep, setUserEmail }) => {

    const [email, setEmail] = useState('')
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // Sets email and ensures it is less than 51 characters
    const handleEmailChange = (e) => {
        const data = e.target.value;
        if (error) {
            setError(false);
        }
        if (data.length > 50) {
            return;
        }
        setEmail(data)
    }


    const handleSubmit = async () => {
        setLoading(true);
        try {
            await sendResetPasswordEmail(email);
            setUserEmail(email);
            nextStep();
        } catch (error) {
            if (error.response.status === 400) {
                const errorMessage = error.response.data.email;
                setError(errorMessage);
            } else {
                alert(error)
            }
        }
        setLoading(false);
    }

    // Submits the form if user presses enter
    const handleFieldKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    }

    return (
        <>
            <SubHeading>
                Enter the email associated with your account.
            </SubHeading>
            <TextField
                style={{
                    textAlign: 'center',
                    padding: 0
                }}
                value={email}
                onChange={handleEmailChange}
                error={error}
                disabled={loading}
                onKeyDown={handleFieldKeyDown}
            />
            {
                error
                &&
                <ErrorMessage>
                    {error}
                </ErrorMessage>
            }
            <ButtonGroup>
                {
                    loading ?
                    <LoadingContainer>
                        <LoadingCircle/>
                    </LoadingContainer>
                    :
                    <>
                        <Button
                            style={{
                                marginRight: '0.5rem',
                                backgroundColor: 'white',
                                border: 'solid 1px black',
                                color: 'black'
                            }}
                            onClick={cancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </>
                }
            </ButtonGroup>
        </>
    )
}

/**
 * In this step, users can resend their password
 * @param {*} cancel - Reverts back to login
 * @param {*} email - Used to resend reset password email
 */
export const StepTwo = ({ cancel, email }) => {

    const [sent, setSent] = useState(false);

    const handleResendClick = async () => {
        if (!sent) {
            setSent(true)
            setTimeout(() => {
                setSent(false);
            }, 5000)

            sendResetPasswordEmail(email)
        }
    }

    return (
        <>
        <SubHeading>
            Check your email for the reset password link. If you didn't get one 
            <Link onClick={handleResendClick}> click here to resend.</Link>
        </SubHeading>
        {
        <ButtonGroup>
            <Button
                style={{
                    marginRight: '0.5rem',
                    backgroundColor: 'white',
                    border: 'solid 1px black',
                    color: 'black'
                }}
                onClick={cancel}
            >
                Cancel
            </Button>
        </ButtonGroup>
        }
        </>
    )
}

/**
 * In this step, users can reset their password
 * @param {*} nextStep - progresses to the final step
 * @param {*} token - token of the current user which is given in their reset password email 
 */
export const StepThree = ({ nextStep, token }) => {

    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePasswordChange = (e) => {
        setError(false);
        setNewPassword(e.target.value);
    }

    const handleSubmit = async () => {

        // Ensures password contains a special character
        // and is of appropriate length
        // eslint-disable-next-line
        const passwordRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        
        if (newPassword.length < 8) {
            setError('Password must have more than 8 characters.');
            return;
        }

        if (!passwordRegex.test(newPassword)) {
            setError('Password must contain a special character');
            return;
        }
        
        setLoading(true);
        
        // Changes the password
        try {
            await changeUserPassword(token, newPassword);
            nextStep();
        } catch (error) {
            if (error.response.status === 400) {
                setError(error.response.data.password[0])
            } else {
                alert(error);
            }
        }
        setLoading(false);
    }

    // Submits the form if the enter key is pressed
    const handleFieldKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    }

    return (
        <>
            <SubHeading>
                Enter the new password you want to change your email with
            </SubHeading>
            <TextField
                style={{
                    textAlign: 'center',
                    padding: 0
                }}
                value={newPassword}
                onChange={handlePasswordChange}
                disabled={loading}
                error={error}
                type="password"
                onKeyDown={handleFieldKeyDown}
            />
            {
                error &&
                <ErrorMessage>
                    {error}
                </ErrorMessage>
            }
            {
                loading ?
                <LoadingContainer>
                    <LoadingCircle/>
                </LoadingContainer>
                :
                <ButtonGroup>
                    <Button
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </ButtonGroup>
            }
        </>
    )
}

/**
 * The final step of resetting a user's password. Users can
 * go back to the login page.
 */
export const StepFour = () => {

    const history = useHistory();

    return (
        <>
        <SubHeading>
            Your email password has successfully changed!
            <Link onClick={() => history.push('/login')}> Click here</Link> to login.
        </SubHeading>
        <TickContainer>
            <TickIcon/>
        </TickContainer>
        </>
    )
}

export default StepOne;
