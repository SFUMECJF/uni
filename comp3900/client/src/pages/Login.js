import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
// Components
import styled from 'styled-components'
import LoginForm from '../components/Login/LoginForm'

const LoginPageContainer = styled.div`
    width: 100%;
    height: max(800px, 100%);
    display: flex;
    align-items: center;
    justify-content: center;
`

/**
 * 
 * Page component for the /login route
 */
export const Login = ({ token }) => {

    const [mode, setMode] = useState('login')
    const [pageLoaded, setPageLoaded] = useState(false)
    const history = useHistory()

    // Loads the page only if there is a token
    useEffect(() => {
        if (token) {
            history.push('/main');
        }
        setPageLoaded(true)
    }, [history, token])

    return (
        <>
        {
            pageLoaded &&
            <LoginPageContainer>
                <LoginForm setMode={setMode} mode={mode}/>
            </LoginPageContainer>
        }
        </>
    )
}
