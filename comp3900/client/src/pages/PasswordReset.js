import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
// Components
import styled from 'styled-components';
import { LoginFormContainer, LogoStyle, Title, TitleStyle } from '../components/Login/LoginForm';
import { ResetPasswordBodyContainer } from '../components/Login/LoginForm/ResetPasswordBody';
import { StepThree, StepFour } from '../components/Login/LoginForm/ResetPasswordBody/Steps';
import Logo from '../components/Logo';

const ResetPageContainer = styled.div`
    width: 100%;
    height: max(800px, 100%);
    display: flex;
    align-items: center;
    justify-content: center;
`
/**
 * Reset Password page which shows on the /login route
 */
const PasswordReset = () => {

    // Tracks the stages for password reset - check the renderStep method
    const [stepNumber, setStepNumber] = useState(1);
    const { token } = useParams();

    const nextStep = () => {
        setStepNumber(stepNumber + 1);
    }

    const renderStep = () => {
        switch(stepNumber) {
            case 2:
                return <StepFour nextStep={nextStep} />
            default:
                return <StepThree token={token} nextStep={nextStep} />
        }
    }

    return (
        <ResetPageContainer>
            <LoginFormContainer>
                <Logo
                    style={LogoStyle}
                    titleStyle={TitleStyle}
                />
                <ResetPasswordBodyContainer>
                    <Title>Reset Password</Title>
                    {renderStep()}
                </ResetPasswordBodyContainer>
            </LoginFormContainer>
        </ResetPageContainer>
    )
}

export default PasswordReset
