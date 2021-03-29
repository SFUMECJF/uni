import API from './api.js';
import { addFeedContent, getMoreFeed } from './feed.js';
import { fileToDataUrl, showModal, checkNewEmail, 
        removeChilds, createLikeList, changeText, 
        handleError, removeFollow, createFollowingList} from './helpers.js';


export function getProfile(api, username) {
    api.getUser(username)
        .then (response => {
            profileModal(response, api);
        })
        .catch(response => {
            handleError(response.status, response.message);
        })  
}


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
    followed.appendChild(document.createTextNode('Follows: ' + response.followed_num));
    
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
                    handleError(response.status, response.message);
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
                    handleError(response.status, response.message);
                })
        }
    })

    const profileFeed = createProfileFeed(response.posts, api);
    profileFeed.style.display = 'block';
    // creating profile card/modal
    details.appendChild(name);
    details.appendChild(email);
    details.appendChild(following);
    details.appendChild(followed);
    profileCard.appendChild(details);
    profileCard.appendChild(followButton);
    profileCard.appendChild(followLabel);
    profileCard.appendChild(profileFeed);
    
    showModal(title, profileCard);

}   

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
