import React, { useState } from 'react'
// Components
import styled from 'styled-components'
import { Title } from '../LoginForm'
import StepOne, { StepTwo } from './SignUpBody/Steps'

const SignUpBodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
`
/**
 * The main body content of the sign up form
 * @param {*} cancel - Cancels sign up and reverts to login step 
 */
const SignUpBody = ({ cancel }) => {

    const [stepNumber, setStepNumber] = useState(1);

    const nextStep = () => {
        setStepNumber(stepNumber + 1);
    }

    const renderSteps = () => {
        switch(stepNumber) {
            case 2:
                return (
                    <StepTwo cancel={cancel} />
                )
            default:
                return (
                    <StepOne cancel={cancel} nextStep={nextStep} />
                )
                
        }
    }

    return (
        <SignUpBodyContainer>
            <Title>New Account</Title>
            {renderSteps()}
        </SignUpBodyContainer>
    )
}

export default SignUpBody
