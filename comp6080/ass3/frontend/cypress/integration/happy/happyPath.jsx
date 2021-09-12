/**
 * Test for specified 'happy path'
 * 1. register successfully
 * 2. create a new game
 * 3. (not required) update the thumbnail and name of the game 
 * 4. start a game
 * 5. end a game
 * 6. load the results page
 * 7. logs out of the app
 * 8. logs back into the app
 */
// upload files package
import 'cypress-file-upload';

describe('Happy path test', () => {
  it('UI test', () => {
    // go to the register page
    cy.visit('http://localhost:3000');
    cy.get('#toRegisterButton').click();

    // fill register form and submit
    // email
    cy.get('#registerEmail')
      .focus()
      .type('tester@test.com')
      .should('have.value', 'tester@test.com');
    // password
    cy.get('#registerPassword')
      .focus()
      .type('testPassword')
      .should('have.value', 'testPassword');
    // confirm password
    cy.get('#registerConfirmPassword')
      .focus()
      .type('testPassword')
      .should('have.value', 'testPassword');
    // username
    cy.get('#registerUsername')
      .focus()
      .type('testName')
      .should('have.value', 'testName');
    // submit 
    cy.get('#registerSubmit').click();

    // log into into the quiz website
    // enter email
    cy.get('#loginEmail')
      .focus()
      .type('tester@test.com')
      .should('have.value', 'tester@test.com');
    // enter password
    cy.get('#loginPassword')
      .focus()
      .type('testPassword')
      .should('have.value', 'testPassword');
    // submit form and log in
    cy.get('#loginSubmit').click();

    // wait 5 secondsfor the quizes to load
    cy.wait(5000);

    // create a new quiz
    // press create quiz button
    cy.get('#createAQuizButton').click();
    // enter quiz name
    cy.get('#createQuizName')
      .focus()
      .type('Test quiz')
      .should('have.value', 'Test quiz');
    // submit the form
    cy.get('#createQuizModalSubmit').click();

    // wait 5 seconds for the quizes to load
    cy.wait(5000);

    // edit quiz
    // go to edit page
    cy.get('#editQuizButton').click();
    // wait 5 seconds for page to load
    cy.wait(5000);
    // add file (is a dummy so shouldn't work)
    cy.fixture('test.png').then( fileContent => {
      cy.get('#editQuizFileInput').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'test.png',
        mimeType: 'image/png'
      });
    });

    // submit file edit
    cy.get('#quizEditSubmitButton').click();
    cy.wait(5000);
    // go back
    cy.get('#adminNavDashboardButton').click();
    // start the game
    cy.get('#startStopSessionButton').click();
    // close the modal prompt
    cy.get('#modalCloseButton').click();
    // wait 5 seconds to load
    cy.wait(5000); 

    // stop the game
    cy.get('#startStopSessionButton').click();

    // go to results
    cy.get('#toResultsPageButton').click();
    // wait 5 seconds to load
    cy.wait(5000); 
    // log out
    cy.get('#adminNavLogoutButton').click();

    // wait 5 seconds to load
    cy.wait(5000); 

    // log back into into the quiz website
    // enter email
    cy.get('#loginEmail')
      .focus()
      .type('tester@test.com')
      .should('have.value', 'tester@test.com');
    // enter password
    cy.get('#loginPassword')
      .focus()
      .type('testPassword')
      .should('have.value', 'testPassword');
    // submit form and log in
    cy.get('#loginSubmit').click();
  })
})