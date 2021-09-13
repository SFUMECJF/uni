import React, { useState } from 'react';
// Components
import styled from 'styled-components';
import { StepOne, StepTwo } from './ResetPasswordBody/Steps'
import { Title } from '../LoginForm';

export const ResetPasswordBodyContainer = styled.div`
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    box-sizing: border-box;
    margin-bottom: 2rem;
`
/**
 * Reset password form
 * @param {*} cancel - Reverts back to the login form
 */
const ResetPasswordBody = ({ cancel }) => {

    const [stepNumber, setStepNumber] = useState(1);
    const [email, setUserEmail] = useState('');

    const nextStep = () => {
        setStepNumber(stepNumber + 1);
    }

    const renderStep = () => {
        switch(stepNumber) {
            case 2:
                return <StepTwo email={email} cancel={cancel} nextStep={nextStep} />
            default:
                return <StepOne setUserEmail={setUserEmail} cancel={cancel} nextStep={nextStep} />
        }
    }

    return (
        <ResetPasswordBodyContainer>
            <Title>
                Reset Password
            </Title>
            {renderStep()}
        </ResetPasswordBodyContainer>
    )
}

export default ResetPasswordBody
