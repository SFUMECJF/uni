import React from 'react'
// Components
import styled from 'styled-components'
import { FaClipboardCheck } from 'react-icons/fa'

const LogoContainer = styled.div`
    width: 100px;
    height: 100px;
    background-color: #BE0000;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Title = styled.h1`
    font-size: ${props => !props.fontSize ? "4.5em" : props.fontSize};
    font-weight: 400;
    margin-right: 1rem;
`

const LogoSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const LogoIcon = styled(FaClipboardCheck)`
    color: white;
    height: 45%;
    width: 45%;
`
/**
 * Logo component of the main and home page
 * @param style - style of the Logo Container
 * @param titleStyle - style of the text
 */
function Logo({ style, titleStyle }) {

    return (
        <LogoSection>
            <Title style={titleStyle}>
                TaskMaster
            </Title>
            <LogoContainer
                style={style}
            >
                <LogoIcon/>
            </LogoContainer>
        </LogoSection>
    )
}

export default Logo
