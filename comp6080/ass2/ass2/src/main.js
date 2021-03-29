import API from './api.js';
// A helper you may want to use when uploading new images to the server.
import { fileToDataUrl, showModal, checkNewEmail, setUserDetails, removeUserDetails, removeFeed, closeModal, handleError} from './helpers.js';
import {getMoreFeed} from './feed.js'
import { getProfile } from './profile.js';

// This url may need to change depending on what port your backend is running
// on.
const api = new API('http://localhost:5000');

// Example usage of makeAPIRequest method.
//api.makeAPIRequest('dummy/user')
//    .then(r => console.log(r));

// p to keep track of where to start
let p = 0;

// all getElement declarations
const login = document.getElementById('login'),
    loginForm = document.getElementById('loginForm'),
    signup = document.getElementById('signup'),
    signupForm = document.getElementById('signupForm'),
    signupButton = document.getElementById('signupButton'),
    nav = document.getElementById('nav'),
    logout = document.getElementById('logout'),
    toLogin = document.getElementById('toLogin'),
    profile = document.getElementById('profile'),
    feed = document.getElementById('feedContainer'),
    post = document.getElementById('post');

// when refreshed or opening new window of app
// will check to see if logged in 
// if logged in with token, will show feed
// else will show login page
if (localStorage.getItem('token') !== null) {
    feed.style.display = 'flex';
    nav.style.display = 'inline';
    setupUi(api);
} else {
    removeUserDetails();
    removeFeed();
    p = 0;
    feed.style.display = 'none';
    nav.style.display = 'none';
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
                    .then(response => {
                        // shows the feed and allows for logout. also sets token in localstorage
                        login.style.display = 'none';
                        
                        feed.style.display = 'flex';

                        // set token
                        localStorage.setItem('token', response.token);
                        
                        // setup ui
                        setupUi(api);
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
            handleError(response);
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
    removeUserDetails();
    removeFeed();
    p = 0;
    login.style.display = 'block';
    nav.style.display = 'none';
    feed.style.display = 'none';
})

// handles logout request
toLogin.addEventListener('click', event => {
    event.preventDefault();
    signup.style.display = 'none';
    signupForm.reset();
    login.style.display = 'block';
})

// Window bottom of page continue loading
document.addEventListener('scroll', event => {
    if (document.scrollingElement.scrollTop >= document.body.offsetHeight) {
        p += getMoreFeed(api, p, feed);
    }
})

// shows own profile
profile.addEventListener('click', event => {
    event.preventDefault()
    getProfile(api, localStorage.getItem('username'));
})

post.addEventListener('click', event => {

    const postBody = document.createElement('form');
    // text inpit
    const description = document.createElement('textarea');
    // file input
    const photoInput = document.createElement('input');
    photoInput.setAttribute('type', 'file');
    // confirm button
    const postConfirm = document.createElement('input');
    postConfirm.setAttribute('type', 'submit');
    


    postBody.appendChild(description);
    postBody.appendChild(photoInput);
    postBody.appendChild(document.createElement('br'));
    postBody.appendChild(postConfirm);
    postBody.addEventListener('submit', event => {
        event.preventDefault();
        fileToDataUrl(photoInput.files[0])
            .then(file => {
                api.newPost(file, description.value)
                    .catch (response => {
                        handleError(response);
                    })
                showModal("Success!", "Posted Successfully");
            })
            .catch(response => {
                handleError(response);
            })
        closeModal();
    })

    showModal("New Post!", postBody);
})

function setupUi(api) {
    // set user id
    setUserDetails(api)
        .then (response => {
            // printing token for dev use
            console.log(localStorage.getItem('token'));
            // show navigation only avaliable if logged in
            nav.style.display = 'inline';
            // show feed after logging in
            p += getMoreFeed(api, p, feed);
        })
        .catch(response => {
            handleError(response);
        })
}