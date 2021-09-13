import React, { useState } from 'react'
// Components
import styled from 'styled-components'
import { 
    TextField,
    Button, 
    Label, 
    SubHeading, 
    Link, 
    TickContainer, 
    TickIcon, 
    ErrorMessage, 
    LoadingCircle
} from '../../LoginForm'
// API
import { registerUser } from '../../../../api/auth'

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 2rem;
`
/**
 * Users enter their details to sign up for TaskMaster
 * @param {*} cancel - Reverts back to login page
 * @param {*} nextStep - Progresses to the final step
 */
export const StepOne = ({ cancel, nextStep }) => {

    // Registering fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // Checks if form is submitting
    const [registering, setRegistering] = useState(false);
    // Checks for errors in form
    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        username: false,
        email: false,
        password: false,
        confirmPassword: false
    })

    const resetErrors = () => {
        if (errors.username || errors.email || errors.password || errors.confirmPassword) {
            setErrors({
                firstName: false,
                lastName: false,
                username: false,
                email: false,
                password: false,
                confirmPassword: false
            })
        }
    }

    // Handles form input changes
    const handleFirstNameChange = (e) => {
        resetErrors();
        
        const name = e.target.value;

        if (name.length > 50) {
            return;
        }

        setFirstName(name);
    }

    const handleLastNameChange = (e) => {
        resetErrors();

        const name = e.target.value;

        if (name.length > 50) {
            return;
        }

        setLastName(name);
    }

    const handleEmailChange = (e) => {
        resetErrors();
        const email = e.target.value;
        if (email.length > 50) {
            return;
        }
        setEmail(email)
    }

    const handleUsernameChange = (e) => {
        resetErrors();
        const username = e.target.value;
        if (username.length > 50) {
            return;
        }
        setUsername(username);
    }

    const handlePasswordChange = (e) => {
        resetErrors();
        const password = e.target.value;
        setPassword(password);
    }

    const handleConfirmPasswordChange = (e) => {
        resetErrors();
        const password = e.target.value;
        setConfirmPassword(password);
    }

    const handleRegisterClick = async (e) => {

        let firstNameError = false;
        let lastNameError = false;
        let usernameError = false;
        let emailError = false;
        let passwordError = false;
        let confirmPasswordError = false;

        // Checks if fields are valid
        if (firstName.length < 1) {
            firstNameError = 'First name cannot be blank'
        }

        if (lastName.length < 1) {
            lastNameError = 'Last name cannot be blank'
        }

        if (username.length < 5) {
            usernameError = 'Username cannot be less 5 characters long'
        }

        if (!/^[^\s@]+@[^\s@]+$/.test(email)) {
            emailError = 'Invalid email address'
        }

        // eslint-disable-next-line
        const passwordRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        if (!passwordRegex.test(password)) {
            passwordError = 'Password must include at least one special character'
        }

        if (password.length < 8) {
            passwordError = 'Password cannot be less than 8 characters long'
        }

        if (password !== confirmPassword) {
            confirmPasswordError = 'Passwords do not match'
        }

        // If any of the errors occured, we do not submit the form
        if (usernameError || emailError || passwordError || confirmPasswordError
            || firstNameError || lastNameError ) {
            setErrors({
                firstName: firstNameError,
                lastName: lastNameError,
                username: usernameError,
                email: emailError,
                password: passwordError,
                confirmPassword: confirmPasswordError
            })
            return;
        }

        setRegistering(true);

        // Submits the form
        try {
            await registerUser(firstName, lastName, email, username, password);
            nextStep();
        } catch (error) {

            if (error.response.status === 400) {
                let errorMessage = 'Errors:\n';
                let errorData = error.response.data;
                Object.keys(errorData).forEach((key, idx) => {
                    errorData[key].forEach((msg) => {
                        errorMessage += (msg + '\n')
                    })
                })
                alert(errorMessage);
            } else {
                alert(error);
            }

            setRegistering(false);
        }

    }

    // Submit the form if a user presses enter
    const handleFieldKeyDown = (e) => {
        if (e.key === "Enter") {
            handleRegisterClick();
        }
    }


    return (
        <>
            <Label htmlFor="First Name">
                First Name
            </Label>  
            <TextField 
                value={firstName} 
                name="First Name"
                onChange={handleFirstNameChange}
                error={errors.firstName}
                disabled={registering}
                onKeyDown={handleFieldKeyDown}
            />
            {
                errors.firstName
                &&
                <ErrorMessage>
                    {errors.firstName}
                </ErrorMessage>
            }
            <Label htmlFor="Last Name">
                Last Name
            </Label>  
            <TextField 
                value={lastName} 
                name="Last Name"
                onChange={handleLastNameChange}
                error={errors.lastName}
                disabled={registering}
                onKeyDown={handleFieldKeyDown}
            />
            {
                errors.lastName
                &&
                <ErrorMessage>
                    {errors.lastName}
                </ErrorMessage>
            }
            <Label htmlFor="Email Address">
                Email Address
            </Label>  
            <TextField 
                value={email} 
                name="Email Address"
                onChange={handleEmailChange}
                error={errors.email}
                disabled={registering}
                onKeyDown={handleFieldKeyDown}
            />
            {
                errors.email
                &&
                <ErrorMessage>
                    {errors.email}
                </ErrorMessage>
            }
            <Label htmlFor="Username">
                Username
            </Label>
            <TextField 
                name="Username"
                onChange={handleUsernameChange}  
                error={errors.username} 
                value={username}
                disabled={registering} 
                onKeyDown={handleFieldKeyDown}
            />
            {
                errors.username
                &&
                <ErrorMessage>
                    {errors.username}
                </ErrorMessage>
            }
            <Label htmlFor="Password">
                Password
            </Label>
            <TextField
                type="password"
                name="Password"
                onChange={handlePasswordChange}
                error={errors.password}
                disabled={registering}
                onKeyDown={handleFieldKeyDown}
            />
            {
                errors.password
                &&
                <ErrorMessage>
                    {errors.password}
                </ErrorMessage>
            }
            <Label htmlFor="Confirm Password">
                Confirm Password
            </Label>
            <TextField
                type="password"
                name="Confirm Password"
                onChange={handleConfirmPasswordChange}
                error={errors.confirmPassword}
                disabled={registering}
                onKeyDown={handleFieldKeyDown}
            />
            {
                errors.confirmPassword
                &&
                <ErrorMessage>
                    {errors.confirmPassword}
                </ErrorMessage>
            }
            
            <ButtonContainer>
                {
                    registering ?
                    <LoadingCircle/>
                    :
                    <>
                        <Button
                            style={{
                                marginRight: '1rem',
                                color: 'black',
                                backgroundColor: 'white',
                                border: 'solid 1px black'
                            }}
                            onClick={cancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            onClick={handleRegisterClick}
                        >
                            Register
                        </Button>
                    </>
                }
            </ButtonContainer>

        </>
    )
}

/**
 * The final step of the signup process
 * @param {*} cancel - Reverts back to the login page
 */
export const StepTwo = ({ cancel }) => {
    return (
        <>
            <SubHeading>
                You have succesfully registered!
                <Link onClick={cancel}> Click here</Link> to login.
            </SubHeading>
            <TickContainer>
                <TickIcon/>
            </TickContainer>
        </>
    )
}

export default StepOne
