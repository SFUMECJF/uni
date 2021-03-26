import API from './api.js';
// A helper you may want to use when uploading new images to the server.
import { fileToDataUrl, showModal, changeContent, checkNewEmail} from './helpers.js';
import {getNewFeed} from './feed.js'

// This url may need to change depending on what port your backend is running
// on.
const api = new API('http://localhost:5000');

// Example usage of makeAPIRequest method.
//api.makeAPIRequest('dummy/user')
//    .then(r => console.log(r));

// all getElement declarations
const login = document.getElementById('login'),
    loginForm = document.getElementById('loginForm'),
    signup = document.getElementById('signup'),
    signupForm = document.getElementById('signupForm'),
    feed = document.getElementById('feedContainer'),
    signupButton = document.getElementById('signupButton'),
    nav = document.getElementById('nav'),
    logout = document.getElementById('logout'),
    toLogin = document.getElementById('toLogin');


if (localStorage.getItem('token') !== null) {
    feed.style.display = 'flex';
    nav.style.display = 'inline';
    getNewFeed(api);

} else {
    logout.style.display = 'none';
    login.style.display = "block";
}


// handles login attempt
login.addEventListener("submit", event => {
    event.preventDefault();
    // get request data
    const requestData = {
        'username': document.getElementById('loginUsername').value,
        'password': document.getElementById('loginPassword').value
    }
    
    // request auth/login from api
    api.auth('auth/login', requestData)
        .then(response => {
            if (response.status === 200) {
                response.json()
                    .then(token => {
                        // shows the feed and allows for logout. also sets token in localstorage
                        login.style.display = 'none';
                        feed.style.display = 'flex';

                        // set token
                        localStorage.setItem('token', token.token);

                        // show navigation only avaliable if logged in
                        nav.style.display = 'inline';
                        getNewFeed(api);
                    })

            // bad username/password
            } else if (response.status === 403) {
                showModal("Username/Password Invalid", "Please try again");
            
            // empty form
            } else if (response.status === 400) {
                showModal("Username/Password not found", "Please register if you do not have an account");
            }
        })

        // catch error in API
        .catch(response => {
            console.log(response.message)
        })
    // reset login form
    loginForm.reset();
});

// handles signup submit eevent
signup.addEventListener('submit', event => {
    event.preventDefault();
    // get all required data
    const username = document.getElementById('signupUsername').value,
        password = document.getElementById('signupPassword').value,
        confirmPassword = document.getElementById('signupConfirmPassword').value,
        email = document.getElementById('signupEmail').value,
        name = document.getElementById('signupName').value;
    // check if all filled
    if (password === "" || confirmPassword === "" || username === "" || email === "" || name === "") {
        showModal("Incomplete Form", "Please fill all fields.");
    } else if (password !== confirmPassword) {
        showModal("Passwords do not match!", "Please try again.");
    } else if (!checkNewEmail(email)) {
        showModal("Invalid Email!", "Please use a valid email address");
    } else {
        const requestData = {
            'username': username,
            'password': password,
            'email': email,
            'name': name
        }
        api.auth('auth/signup', requestData)
            .then(response => {
                if (response.status === 200) {
                    signup.style.display = "none";
                    login.style.display = "block";
                    showModal("Successful Signup!", "Please login to continue");
                } else if (response.status === 409) {
                    showModal("Username Taken!", "Please try a different username");
                // most likely wont hit
                } else if (response.status === 400) {
                    showModal("Missing password!", "Please enter a valid password.")
                }
            })

            // catch error in API
            .catch(response => {
                console.log(response.message)
            })
    
    }

});

/**
 * Button listeners
 */

// handles signup new user request to sign up
signupButton.addEventListener("click", event => {
    event.preventDefault();
    login.style.display = 'none';
    signup.style.display = 'block';
});

// handles logout request
logout.addEventListener('click', event => {
    event.preventDefault();
    localStorage.removeItem('token');
    feed.style.display = 'none';
    login.style.display = 'block';
    nav.style.display = 'none';
})

// handles logout request
toLogin.addEventListener('click', event => {
    event.preventDefault();
    signup.style.display = 'none';
    signupForm.reset();
    login.style.display = 'block';
})