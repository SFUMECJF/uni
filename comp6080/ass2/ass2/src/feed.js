import API from './api.js';
import { fileToDataUrl, showModal, checkNewEmail, 
        removeChilds, createLikeList, changeText, 
        handleError} from './helpers.js';


/**
 * Given an api will request for posts and add them to feed
 * @param {API} api 
 */
export function getNewFeed(api) {
    const feed = document.getElementById('feedContainer');
    removeChilds(feed);
    api.getFeed('user/feed', localStorage.getItem('token'))
        .then(response => response.json())
        .then(jsonResponse => {
            if (jsonResponse.posts !== undefined && jsonResponse.posts.length !== 0) {
                jsonResponse.posts.forEach(element => {
                    feed.appendChild(addFeedContent(element, api));
                })
            } else {
                const followToSee = document.createElement('div');
                followToSee.appendChild(document.createTextNode('follow to see content!'));
                followToSee.style.textAlign = 'center';
                feed.appendChild(followToSee);
            }
        })

        // log error in console
        .catch(response => {
            handleError(response.status, response.message);
        })
}

/**
 * Given a post will add to feed
 * @param {JSON} element 
 */
export function addFeedContent(element, api) {
    const meta = element.meta;
    const post = {
        'author' : meta.author,
        'postDate' : new Date(1504095567183).toLocaleDateString("en-US"),
        'srcImage' : `data:image/png;base64, ${element.src}`,
        'nLikes' : meta.likes.length,
        'description' : meta.description_text,
        'nComments' : element.comments.length,
        'id': element.id
    }

    // new feed unit
    const feedUnit = document.createElement('div');
    feedUnit.setAttribute('class', 'card');
    feedUnit.setAttribute('id', "postId" + post.id)
    
    // card header
    const feedHeader = document.createElement('div');
    feedHeader.setAttribute('class', 'card-header')

    // author
    const author = document.createElement('h5');
    author.setAttribute('class', 'card-title');
    author.appendChild(document.createTextNode(post.author));

    // postDate
    const postDate = document.createElement('div');
    postDate.setAttribute('class', 'card-text text-black-50')
    postDate.appendChild(document.createTextNode(post.postDate));


    // card body
    const cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');

    // description
    const desc = document.createElement('div');
    desc.setAttribute('class', 'card-text');
    desc.appendChild(document.createTextNode(post.description));
    desc.style.paddingBottom = "2%"

    // image
    const image = document.createElement('img');
    image.setAttribute('class', 'card-img-top');
    image.setAttribute('src', post.srcImage);
    image.setAttribute('alt', 'postImage');
    


    // likes (currently doesn't show anything but has number of likes)
    // USED FOR SHOWING LIKES!
    const likes = document.createElement('button');
    likes.setAttribute('class', 'btn btn-link');
    likes.setAttribute('id', 'likes' + post.id);
    if (post.nLikes === 0) {
        likes.appendChild(document.createTextNode("Be the first to like"));
    } else if (post.nLikes === 1) {
        likes.appendChild(document.createTextNode("1 like"));
    } else {
        likes.appendChild(document.createTextNode(post.nLikes + "likes"));
    }

    // likes (currently doesn't show anything but has number of likes)
    // USED FOR SHOWING LIKES!
    const comments = document.createElement('button');
    comments.setAttribute('class', 'btn btn-link');
    if (post.nComments === 0) {
        comments.appendChild(document.createTextNode("No comments"));
    } else if (post.nComments === 1) {
        comments.appendChild(document.createTextNode("1 comment"));

    } else {
        comments.appendChild(document.createTextNode(post.nLikes + " comments"));

    }

    // creating like button
    const likeButton = document.createElement('input');
    likeButton.setAttribute('type', 'checkbox');
    likeButton.setAttribute('class', 'btn-check');
    likeButton.setAttribute('id', 'likeBtnId' + post.id);
    likeButton.setAttribute('autocomplete', 'off');

    // like button label 
    const likeLabel = document.createElement('label');
    likeLabel.setAttribute('class', 'btn btn-outline-primary');
    likeLabel.setAttribute('for', 'likeBtnId' + post.id);
    likeLabel.setAttribute('id', 'likeBtnLabelId' + post.id);
    likeLabel.appendChild(document.createTextNode('like'));

    // if the user has liked the post already and has refreshed
    if (meta.likes.includes(parseInt(localStorage.getItem('id'), 10))) {
        console.log('hit');
        likeButton.classList.add = 'active';
        likeLabel.classList.add = 'active';
        changeText(likeLabel, 'unlike');
        likeButton.checked = true;
    }

    // creating comment button 
    // for later
    const commentButton = document.createElement('button');
    commentButton.setAttribute('class', 'btn btn-secondary');
    commentButton.appendChild(document.createTextNode('comment'));

    // creating div for like and comment button
    const interactionDiv = document.createElement('div');
    interactionDiv.appendChild(likeButton);
    interactionDiv.appendChild(likeLabel);
    interactionDiv.appendChild(commentButton);
    
    // feed header
    feedHeader.appendChild(author);
    feedHeader.appendChild(postDate);

    // adding to card body
    cardBody.appendChild(desc);
    cardBody.appendChild(image);

    cardBody.appendChild(likes);
    cardBody.appendChild(comments);

    cardBody.appendChild(interactionDiv);
    // adding listeners
    // like listener button to list
    likes.addEventListener('click', event => {
        event.preventDefault();
        showModal("Likes", createLikeList(meta.likes, api));
    })

    // opening comments listener
    comments.addEventListener('click', event => {
        event.preventDefault();
        if (post.nComments === 0) {
            showModal("Comments", "Be the first to comment!");
        } else {
            const comments = element.comments
            const commentList = document.createElement('ul');
            let i = 0;
            for (i = 0; i < comments.length; i++) {
                let listComment = document.createElement('li');
                let commentContent = document.createElement('div');
                commentContent.appendChild(document.createTextNode(comments[i].author + ": " + comments[i].comment));
                listComment.appendChild(commentContent);
                commentList.appendChild(listComment);
            }
            showModal("Comments", commentList);
        }
    })
    
    // adding listener for likes
    likeButton.addEventListener('change', event => {
        event.preventDefault();
        if (likeButton.checked) {
            api.like(post.id, 'like') 
                .then(response => response.json())
                .then (response => {
                    post.nLikes ++;
                    updateLikes('likes' + post.id, post.nLikes);
                    changeText(likeLabel, 'unlike');
                    console.log('Done', response);
                })
                .catch(response => {
                    handleError(response.status, response.message);
                })        
        } else {
            api.like(post.id, 'unlike') 
                .then(response => response.json())
                .then (response => {
                        post.nLikes --;
                        updateLikes('likes' + post.id, post.nLikes);
                        changeText(likeLabel, 'like');
                        console.log('Done', response);
                })
                .catch(response => {
                    handleError(response.status, response.message);
                })
        }
    })
    
    // creating the card!
    // author + post date
    feedUnit.appendChild(feedHeader);
    // the entire body including
    // image, description, likes and comments
    feedUnit.appendChild(cardBody);

    return feedUnit;
}

/**
 * Given an id will update with new likes number
 * @param {string} id 
 * @param {int} new number of likes
 */
function updateLikes(id, newNumber) {
    const likes = document.getElementById(id);
    if (newNumber === 0) {
        changeText(likes, "Be the first to like");
    } else if (newNumber === 1) {
        changeText(likes, "1 like");
    } else {
        changeText(likes, newNumber + " likes");
    }
}