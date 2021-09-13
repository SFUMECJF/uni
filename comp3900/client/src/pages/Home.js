import React from 'react';
import { useHistory } from 'react-router-dom';
// Components
import styled from 'styled-components';
import Logo from '../components/Logo';

const HomeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: max(100%, 700px);
    background-color: white;
    flex-direction: column;
`

const Description = styled.p`
    margin-top: 0;
    font-size: 1.2em;
`

const LoginBtn = styled.button`
    border-radius: 5px;
    color: white;
    width: 150px;
    height: 45px;
    margin-top: 2rem;
    border: none;
    outline: none;
    background-color: #007ABE;
    cursor: pointer;
    font-size: 1em;
    &:hover {
        filter: brightness(0.9);
    }

    &:active {
        filter: brightness(0.7);
    }
`
/**
 * Home page component shown on the / route
 */
const Home = () => {

    const history = useHistory();

    const handleBtnClick = () => {
        history.push('/login')
    }

    return (
        <HomeContainer>
            <Logo/> 
            <Description>
                Workflow just got easier
            </Description>
            <LoginBtn onClick={handleBtnClick}>
                Login Here
            </LoginBtn>
        </HomeContainer>
    )
}

export default Home
