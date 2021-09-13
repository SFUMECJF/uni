import { Dialog, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import styled from 'styled-components'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { getFriends } from '../../api/profile'


const TaskSearchContentContainer = styled(DialogContent)`
    width: 300px;
    height: 400px;
`
const FieldInput = styled.input`
    height: 30px;
    width: 100%;
    border-radius: 6px;
    border: 1px solid #847F7F;
    outline: none;
    padding-left: 1rem;
    font-family: Poppins;
    box-sizing: border-box;
`

const SummaryTextAreaField = styled.textarea`
    width: 100%;
    height: 100px;
    font-family: Poppins;
    box-sizing: border-box;
    resize: none;
`



const TaskSearchButtonGroup = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 1rem;
`

const SearchButton = styled.button`
    cursor: pointer;
`

const SearchHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`

const FieldLabel = styled.label`
`

const DeadlineFieldContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const Cross = styled(AiOutlineCloseCircle)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 2rem;
    padding-left: 1rem;
    height: 20px;
    width: 20px;
    cursor: pointer;
`

const DeadlineField = ({ onChange, value, setDeadline}) =>  ( 
    
    <DeadlineFieldContainer>
        <FieldLabel>
            Deadline
        </FieldLabel>
        <TextField
            onChange={onChange}
            id="date"
            type="date"
            value={value}
            onInput={e => setDeadline(e.target.value)}
        >
        </TextField>
    </DeadlineFieldContainer>
)

/**
 * Search form for the main display and profile display
 * @param {*} token - Current token
 * @param {*} show - Boolean to show the form
 * @param {*} setShowFilter - useState function for the show prop
 * @param {*} setSearchQuery - useState function to pass the searcQuery parameters
 * @param {*} onProfile - Boolean to check which page this component will be rendered on
 * @param {*} profileId - Id of the profile the search form is on
 */
const TaskSearchForm = ({ token, show, setShowFilter, setSearchQuery, onProfile, profileId}) => {
    const [ID, setID] = useState(undefined);
    const [taskName, setTaskName] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [summary, setSummary] = useState(undefined);
    const [deadline, setDeadline] = useState(undefined);

    const handleSearch = () => {


        getFriends(token)
        .then(({ data }) => {
            if (email) {
                var assigned_to = undefined;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].email === email) {
                        assigned_to = data[i].id;
                    }
                }
                if (!assigned_to) { 
                    alert("Assigned user is not your friend");
                }

            } 
            const return_object = {
                "id" : ID,
                "title" : taskName,
                "summary" : summary,
                "assigned_to" : profileId? profileId : assigned_to,
                "deadline" : deadline,
    
            }
            setSearchQuery(return_object);

            



        }).catch(() => {
            alert('Could not retrieve friends at this time.')
        })
    


        setShowFilter(!show);
    }
    
    useEffect(() => {
        setID(undefined);
        setTaskName(undefined);
        setEmail(undefined);
        setSummary(undefined);
        setDeadline(undefined);
    }, [show])

    return (
        <Dialog open={show}>
            <SearchHeader>
                <DialogTitle>Filter Task Results</DialogTitle>
                <Cross onClick={() => setShowFilter(false)}/>
            </SearchHeader>
            <TaskSearchContentContainer>
                <FieldLabel>
                    Task ID
                </FieldLabel>
                <FieldInput input={ID} onInput={e => setID(e.target.value)}/>
                <FieldLabel>
                    Task Name
                </FieldLabel>
                <FieldInput input={taskName} onInput={e => setTaskName(e.target.value)}/>
                {!onProfile && <div>
                <FieldLabel>
                    Assignee Email
                </FieldLabel >
                <FieldInput input={email} onInput={e => setEmail(e.target.value)}/>  
                </div>}
                <FieldLabel>
                    Summary
                </FieldLabel>
                <SummaryTextAreaField input={summary} onInput={e => setSummary(e.target.value)}/>
                <DeadlineField setDeadline={setDeadline}/>
                <TaskSearchButtonGroup>
                    <SearchButton onClick={() => handleSearch()}>
                        Search
                    </SearchButton>
                </TaskSearchButtonGroup>
            </TaskSearchContentContainer>
        </Dialog>
    )

}

export default TaskSearchForm
//deadline={deadline} setDeadline={setDeadline}