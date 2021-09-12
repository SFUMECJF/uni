/**
 * All helper functions in here
 */
// api import
import { API } from './api/Api'

/**
 * Plucked from assessment 2. Simply converts img to something that can be
 * sent through to the API
 * Given a js file object representing a jpg or png image, such as one taken
 * from a html file input element, return a promise which resolves to the file
 * data as a data url.
 * More info:
 *   https://developer.mozilla.org/en-US/docs/Web/API/File
 *   https://developer.mozilla.org/en-US/docs/Web/API/FileReader
 *   https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
 *
 * Example Usage:
 *   const file = document.querySelector('input[type="file"]').files[0];
 *   console.log(fileToDataUrl(file));
 * @param {File} file The file to be read.
 * @return {Promise<string>} Promise which resolves to the file as a data url.
 */
export function fileToDataUrl (file) {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg']
  const valid = validFileTypes.find(type => type === file.type);
  // Bad data, let's walk away.
  if (!valid) {
    return false;
  } else {
    const reader = new FileReader();
    const dataUrlPromise = new Promise((resolve, reject) => {
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result);
    });
    reader.readAsDataURL(file);
    return dataUrlPromise;
  }
}

/**
 * Removes all sensitive data from local machine for logs out
 */
export function LogoutRemoveData () {
  localStorage.removeItem('token');
}

/**
 * Will retrieve an entire list of quizes based on the token in
 * local storage
 * @returns array
 */
export async function GetQuizArray () {
  const response = await new API().getQuizzes();
  return response;
}

export async function getQuizDataById (id) {
  const response = await new API().getQuizById(id);
  return response;
}

export function getQuizDuration (quizzes) {
  let total = 0;
  for (let i = 0; i < quizzes.length; i++) {
    total += parseInt(quizzes[i].duration, 10);
  }
  return total;
}

/**
 * Given data for a question as well its id
 * will call a put function to request via the api
 * works with the modular question form
 * @param {string} quizId
 * @param {Object} quizData
 * @param {string} isEdit Is whether or not the user is editing a question or creating. references the questionID to be edited!
 * @returns the response from the API call
 */
export async function updateQuestions (quizId, quizData, isEdit) {
  // get all data
  const userAnswers = [];
  const corrAnswers = [];
  // get all answers both user and correct answers
  // using index numbers for now, starting at 0 to 3
  for (let i = 0; i < 4; i++) {
    // push all possible selections for user
    const userAnswerPossible = document.getElementById('newQuestionAnswer' + i.toString()).value;
    userAnswers.push(userAnswerPossible);
    // push all answers
    const corrAnswerPossible = document.getElementById('newQuestionRealAnswers' + i.toString());
    if (corrAnswerPossible.checked) {
      corrAnswers.push(i);
    }
  }
  console.log(corrAnswers);
  let photo = '';
  // check if the photo has been previously changed
  // meaning that it should be passed on
  if (isEdit !== null && quizData.questions[isEdit].photo !== '') {
    photo = quizData.questions[isEdit].photo;
  }
  const newQuestionData = {
    type: document.getElementById('newQuestionType').value,
    duration: document.getElementById('newQuestionTimeLimit').value,
    question: document.getElementById('newQuestionName').value,
    pointValue: document.getElementById('newQuestionPointValue').value,
    userAnswers: userAnswers,
    correctAnswers: corrAnswers,
    photo: photo,
  }
  // check if user is editing
  // is not editing. Will push new question onto dist with new questionid
  if (isEdit === null) {
    quizData.questions.push(newQuestionData);
  // is editing. Will edit isEdit reference and replace it with new question
  } else {
    quizData.questions[isEdit] = newQuestionData;
  }
  // push new question onto list
  // sent request with new question
  return (await new API().editQuizById(quizId, quizData));
}

export function gotCorrect (user) {
  let counter = 0;
  for (let i = 0; i < user.answers.length; i++) {
    if (user.answers[i].correct) {
      counter++;
    }
  }
  return counter;
}

export function GetTopFiveResults (data) {
  const results = data.results;
  results.sort(function (user1, user2) {
    const user1Correct = gotCorrect(user1);
    const user2Correct = gotCorrect(user2);
    // Compare user correct answers number
    if (user1Correct < user2Correct) return -1;
    if (user1Correct > user2Correct) return 1;
    return 0;
  });
  return results;
}

/**
 * Given an object with a list of users, will return
 * a list of two lists
 * index 0 is just of objects for the chart to show percentage
 * of correct answers by question
 * index 1 is a list of the average response times for each question
 * @param {Object} results response from results get API
 * @returns a 2d array.
 */
export function GetTotalAnswersCorrect (data) {
  const results = data.results;

  // array of answers that stores correct for all questions
  const answersCorrect = new Array(results[0].answers.length).fill(0);
  const answersAttempt = new Array(results[0].answers.length).fill(0);
  // loop through all results for people to get total correct answers
  for (let i = 0; i < results.length; i++) {
    for (let j = 0; j < results[i].answers.length; j++) {
      if (results[i].answers[j].correct) {
        answersCorrect[j] = answersCorrect[j] + 1;
      }
      answersAttempt[j] = answersAttempt[j] + 1;
    }
  }

  // get average time for all questions
  const answerAveragetime = new Array(results[0].answers.length).fill(0);
  console.log(results[0].answers[0]);
  for (let i = 0; i < results.length; i++) {
    for (let j = 0; j < results[i].answers.length; j++) {
      answerAveragetime[j] += ((new Date(results[i].answers[j].answeredAt) - new Date(results[i].answers[j].questionStartedAt)) / 1000);
    }
  }
  for (let i = 0; i < answerAveragetime.length; i++) {
    answerAveragetime[i] = { label: 'Question ' + i, y: (answerAveragetime[i] / answersAttempt[i]) };
  }

  // creating a list of objects for the chart to interpret
  const answersDataCorrect = []
  for (let k = 0; k < answersCorrect.length; k++) {
    answersDataCorrect[k] = { label: 'Question ' + k, y: (answersCorrect[k] / answersAttempt[k]) }
  }
  console.log([answersDataCorrect, answerAveragetime]);
  console.log([answersCorrect, answersAttempt]);
  return [answersDataCorrect, answerAveragetime];
}
