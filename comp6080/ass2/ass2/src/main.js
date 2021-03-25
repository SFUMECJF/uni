import API from './api.js';
// A helper you may want to use when uploading new images to the server.
import { fileToDataUrl, showModal, checkEmail} from './helpers.js';

// This url may need to change depending on what port your backend is running
// on.
const api = new API('http://localhost:5000');


// Example usage of makeAPIRequest method.
//api.makeAPIRequest('dummy/user')
//    .then(r => console.log(r));

// all getElement declarations
const login = document.getElementById('login'),
    signup = document.getElementById('signup'),
    feed = document.getElementById('feed'),
    registerButton = document.getElementById('registerbutton');

login.style.display = "block";

// handles login attempt
login.addEventListener("submit", event => {
    event.preventDefault();
    const requestData = {
        'username': document.getElementById('loginUsername').value,
        'password': document.getElementById('loginPassword').value
    }
    console.log(requestData)
    api.auth('auth/login', requestData)
        .then(response => {
            if (response.status === 200) {
                login.style.display = 'none';
                feed.style.display = 'flex';
            } else if (response.status === 403) {
                // bad username/password
                showModal("Username/Password Invalid", "Please try again");
            } else if (response.status === 400) {
                // empty form
                showModal("Username/Password not found", "Please register if you do not have an account");
            }
        })

        // catch error in API
        .catch(response => {
            console.log(response.message)
        })
    
});

// handles signup new user request to sign up
document.getElementById('signupButton').addEventListener("click", event => {
    event.preventDefault();
    login.style.display = 'none';
    signup.style.display = 'block';
});

signup.addEventListener('submit', event => {
    event.preventDefault();
    const username = document.getElementById('signupUsername').value,
        password = document.getElementById('signupPassword').value,
        confirmPassword = document.getElementById('signupConfirmPassword').value,
        email = document.getElementById('signupEmail').value,
        name = document.getElementById('signupName').value;
        
    if (password === "" || confirmPassword === "" || username === "" || email === "" || name === "") {
        showModal("Incomplete Form", "Please fill all fields.");
    } else if (password !== confirmPassword) {
        showModal("Passwords do not match!", "Please try again.");
    } else if (!checkEmail(email)) {
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