import React from 'react'
import styled from 'styled-components'

const LogoContainer = styled.div`
    width: 100px;
    height: 100px;
    background-color: #BE0000;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const LogoSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const ProfileIcon = styled.img`
    border-radius: 50%;
    border: solid 3px #A90000;
    width: 100px;
    height: 100px;
    cursor: pointer;
    background: white;
`
/**
 * Task bar to the left of the main page showing the task stats and the feedback form
 * @param {*} icon1 - Image to render
 */
function ProfilePic({icon1}) {

    return (
        <LogoSection>
            <LogoContainer>
                <ProfileIcon src={icon1}/>
            </LogoContainer>
        </LogoSection>
    )
}

export default ProfilePic
