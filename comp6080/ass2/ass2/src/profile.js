import API from './api.js';
import { addFeedContent } from './feed.js';
import { fileToDataUrl, showModal, checkNewEmail, 
        removeChilds, changeText, 
        handleError, removeFollow, createFollowingList} from './helpers.js';


/**
 * Given a username, will get the profile from API
 * @param {API} api 
 * @param {string} username 
 */
export function getProfile(api, username) {
    api.getUser(username)
        .then (response => {
            profileModal(response, api);
        })
        .catch(response => {
            handleError(response.message);
        })  
}

/**
 * Given a response, will show a modal of the profile.
 * Used both for showing the user and other people's profiles
 * @param {JSON} response 
 * @param {API} api 
 */
export function profileModal(response, api) { 
    const profileCard = document.createElement('div');
    // name
    const title = response.username;
    // details
    const details = document.createElement('ul');
    // name
    const name = document.createElement('li');
    name.appendChild(document.createTextNode('Name: ' + response.name));
    // email
    const email = document.createElement('li');
    email.appendChild(document.createTextNode('email: ' + response.email));
    // following list
    const following = document.createElement('li');
    following.appendChild(document.createTextNode('Following: '));
    following.appendChild(createFollowingList(response.following, api));

    const followed = document.createElement('li');
    followed.appendChild(document.createTextNode('Followers: ' + response.followed_num));

    const profileFeed = createProfileFeed(response.posts, api);
    profileFeed.style.display = 'block';


    // creating profile card/modal
    details.appendChild(name);
    details.appendChild(email);
    details.appendChild(following);
    details.appendChild(followed);
    profileCard.appendChild(details);

    // own profile. Allow for profile edit
    if (response.id === parseInt(localStorage.getItem('id'), 10)) {
        const editButton = document.createElement('button');
        editButton.setAttribute('class', 'btn btn-secondary');
        editButton.appendChild(document.createTextNode('update')); 
        editButton.addEventListener('click', event => {
            // edit form
            const editForm = document.createElement('form');

            // name
            const editName = document.createElement('input');
            editName.setAttribute('type', 'text');
            editName.setAttribute('placeholder', 'New Name');
            // email
            const editEmail = document.createElement('input');
            editEmail.setAttribute('type', 'text');
            editEmail.setAttribute('placeholder', 'New Email');

            // password
            const editPassword = document.createElement('input');
            const confirmPassword = document.createElement('input');
            editPassword.setAttribute('type', 'password');
            editPassword.setAttribute('placeholder', 'New Password');

            confirmPassword.setAttribute('type', 'password');
            confirmPassword.setAttribute('placeholder', 'Confirm New Password');

            const submitButton = document.createElement('input');
            submitButton.setAttribute('type', 'submit');

            editForm.appendChild(editName);
            editForm.appendChild(editEmail);
            editForm.appendChild(editPassword);
            editForm.appendChild(confirmPassword);
            editForm.appendChild(submitButton);

            editForm.addEventListener('submit', event => {
                event.preventDefault();
                let changed = '';
                let cannot = '';
                let data = {}
                // everything defaults to ''
                if ((confirmPassword.value === editPassword.value )&& confirmPassword.value !== '') {
                    data['password'] = editPassword.value;
                    changed = changed + "Changed password! "
                } else {
                    cannot = cannot + "Cannot change password. Passwords do not match or are empty. "
                }

                if (editName.value !== '') {
                    data['name'] = editName.value;
                    changed = changed + "Changed Name! "
                } else {
                    cannot = cannot + "Cannot change Name. name is empty! "
                }

                if (editEmail.value !== '' && checkNewEmail(editEmail.value)) {
                    data['email'] = email.value;
                    changed = changed + "Changed Email! "
                } else if (!checkNewEmail(editEmail.value)) {
                    cannot = cannot + "Cannot change Email. Email is not Valid ";
                }
                
                api.updateAccount(data)
                    .then (response => {
                        showModal("Account Change Attempted", changed + '\n' + cannot);
                    })
                    .catch(response => {
                        handleError(response.message);
                    })

                    

            })

            showModal("Edit Account", editForm);
        })
        profileCard.appendChild(editButton);

    // is someone elses profile so show follow instead
    } else {
            // creating follow button
        const followButton = document.createElement('input');
        followButton.setAttribute('type', 'checkbox');
        followButton.setAttribute('class', 'btn-check');
        followButton.setAttribute('id', 'followButton' + response.id);
        followButton.setAttribute('autocomplete', 'off');

        // follow button label 
        const followLabel = document.createElement('label');
        followLabel.setAttribute('class', 'btn btn-outline-primary');
        followLabel.setAttribute('for', 'followButton' + response.id);
        followLabel.setAttribute('id', 'followButtonLabel' + response.id);
        followLabel.appendChild(document.createTextNode('follow'));

        if (localStorage.getItem('following').includes(response.id)) {
            followButton.classList.add = 'active';
            followLabel.classList.add = 'active';
            changeText(followLabel, 'unfollow');
            followButton.checked = true;
        }
            // adding listener for likes
        followButton.addEventListener('change', event => {
            event.preventDefault();
            if (followButton.checked) {
                api.follow(response.username, 'follow') 
                    .then(response => response.json())
                    .then (response => {
                        post.nLikes ++;
                        localStorage.setItem('following', localStorage.getItem('following').push(response.id));
                        changeText(likeLabel, 'unfollow');
                        console.log('followed', response);
                    })
                    .catch(response => {
                        handleError(response);
                    })        
            } else {
                api.follow(response.username, 'unfollow') 
                    .then(response => response.json())
                    .then (response => {
                            post.nLikes --;
                            removeFollow(response.id);
                            changeText(likeLabel, 'follow');
                            console.log('unfollowed', response);
                    })
                    .catch(response => {
                        handleError(response);
                    })
            }
        })

        profileCard.appendChild(followButton);
        profileCard.appendChild(followLabel);

    }
    profileCard.appendChild(profileFeed);
    

    showModal(title, profileCard);

}   

/**
 * Given an array of posts, will create a new SCROLLABLE
 * feed within the modal!
 * @param {array} posts 
 * @param {API} api 
 * @returns 
 */
function createProfileFeed(posts, api) {
    const newFeed = document.createElement('div');
    newFeed.setAttribute('class', 'feed-container flex-column')
    newFeed.setAttribute('id', 'profileFeed');

    if (posts.length === 0 ) {
        newFeed.appendChild(document.createTextNode('This user has no posts'));
    } else {
        posts.forEach(element => {
            api.getPost(element)
                .then(response => {
                    newFeed.appendChild(addFeedContent(response, api));
                })
        });
    }
    return newFeed;
}

