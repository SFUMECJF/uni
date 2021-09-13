import React, { useState } from 'react';
// Components
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi'
import { useHistory } from 'react-router-dom';
// API
import { searchUserEmail } from '../../api/profile';

// Styled components
const SearchBarContainer = styled.div`
    border-radius: 10px;
    background-color: white;
    height: 90%;
    width: 60%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 1rem;
    box-sizing: border-box;
    color: #847F7F;
    padding-right: 0.5rem;
`

const SearchIcon = styled(FiSearch)`
    width: 25px;
    height: 25px;
`

const SearchInput = styled.input`
    border: none;
    height: 100%;
    width: 100%;
    outline: none;
    padding-left: 1rem;
    font-size: 1.3em;
    box-sizing: border-box;
`

const SearchButton = styled.button`
    border-radius: 5px;
    color: white;
    height: 80%;
    width: 10%;
    border: none;
    outline: none;

    background-color: #A90000;
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
 * Shown on the header, which allows user to find other users by email
 * @param {*} param0 
 * @returns 
 */
export const SearchBar = ({ token }) => {
    const [keyword, setKeyword] = useState();
    const history = useHistory();
    // Searches a user by email
    const search = () => {
        searchUserEmail(token, keyword).then((data) => {
            if (data.data[0]['isPrivate']) {
                alert('Could not find user.')
            } else {
            history.push('/profile/' + data.data[0]["username"])
            }
        })
        .catch(() => {
            alert('Could not find user.')
        })
    }

    return (
        <SearchBarContainer>
            <SearchIcon/>
            <SearchInput placeholder="Enter email of friend..." value={keyword} onInput={e => setKeyword(e.target.value)}/>
            <SearchButton onClick={search}>Search</SearchButton>
        </SearchBarContainer>
    )
}
