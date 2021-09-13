import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import { updateBusyness } from '../../api/profile';


const RatingContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    padding-top: 10px;

`

/**
 * Rating form to provide feedback for how busy a user's week has been
 * @param {*} setShowFrom - useState function to toggle when to hide the form
 * @param {*} token - Toen of the user
 * @param {*} userDetails - Details of the current user
 * @param {*} setShowThanks - useState function to set the showThanks flag
 */
const SimpleRating = ({setShowForm, token, userDetails , setShowThanks}) => {
  const labels = {
    0.5: 'Very Quiet 0%',
    1: 'Quiet 25%',
    1.5: 'Average 50%',
    2: 'Busy 75%',
    2.5: 'Maxed Out 100%',
    3: 'Overloaded 100%+',
  };

  const labels_feedback = {
    0.5: '0',
    1: '25',
    1.5: '50',
    2: '75',
    2.5: '100',
    3: '101',
  };
  
  const useStyles = makeStyles({
    root: {
      width: 200,
      display: 'flex',
      alignItems: 'center',
    },
  });

  const changeHandler = (event, newValue) => {

    setValue(newValue);
    setShowForm(false);
    updateBusyness(token, userDetails, newValue*2);
    var newUserDetails = userDetails;
    
    newUserDetails.busyness_can_reply = false;
    newUserDetails.busyness_response = labels_feedback[newValue];
    setShowThanks(true);
    
  }
  const [value, setValue] = React.useState(1.5);
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();


  return (
    <RatingContainer className={classes.root}>
      <Rating 
        max={3}
        name="customized-icons"
        value={value}
        precision={0.5}
        onChange={changeHandler}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
    </RatingContainer>
  );
}

export default SimpleRating
