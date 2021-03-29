import API from './api.js';
import { fileToDataUrl, showModal, checkNewEmail, 
        removeChilds, createLikeList, changeText, 
        handleError, closeModal} from './helpers.js';

import {getProfile} from './profile.js';

/**
 * Given an api will request for posts and add them to feed
 * @param {API} api 
 * @param {int} p
 * @param {HTMLElement} feed
 */
export function getMoreFeed(api, p, feed) {
    if (localStorage.getItem('following').length === 0) {
        removeChilds(feed);
        const followToSee = document.createElement('div');
        followToSee.appendChild(document.createTextNode('follow to see content!'));
        followToSee.style.textAlign = 'center';
        feed.appendChild(followToSee);
        return 0;
    } else {
        api.getFeed('user/feed', p)
        .then(jsonResponse => {
            if (jsonResponse.posts !== undefined && jsonResponse.posts.length !== 0) {
                jsonResponse.posts.forEach(element => {
                    feed.appendChild(addFeedContent(element, api));
                })
            }
        })
        // log error in console
        .catch(response => {
            handleError(response);
        })
        return 10;
    }
    // increments in 10 to ensure it keeps on loading infinitely
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
    const author = document.createElement('button');
    author.setAttribute('type', 'button');
    author.setAttribute('class', 'card-title btn btn-link');
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
    comments.setAttribute('id', 'comments' + post.id);
    if (post.nComments === 0) {
        comments.appendChild(document.createTextNode("No comments"));
    } else if (post.nComments === 1) {
        comments.appendChild(document.createTextNode("1 comment"));

    } else {
        comments.appendChild(document.createTextNode(post.nComments + " comments"));

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
            const comments = element.comments;
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
    
    // adding profile button
    author.addEventListener('click', event => {
        event.preventDefault();
        getProfile(api, post.author);
    })

    // adding listener for likes
    likeButton.addEventListener('change', event => {
        event.preventDefault();
        if (likeButton.checked) {
            api.like(post.id, 'like') 
                .then (response => {
                    post.nLikes ++;
                    updateLikes(post.id, post.nLikes);
                    changeText(likeLabel, 'unlike');
                    console.log('liked', response);
                })
                .catch(response => {
                    handleError(response);
                })        
        } else {
            api.like(post.id, 'unlike') 
                .then (response => {
                        post.nLikes --;
                        updateLikes(post.id, post.nLikes);
                        changeText(likeLabel, 'like');
                        console.log('unliked', response);
                })
                .catch(response => {
                    handleError(response);
                })
        }
    })

    // adding comment
    commentButton.addEventListener('click', event => {
        event.preventDefault();
        const newCommentArray = createInput();
        const newComment = newCommentArray[0];
        const textArea = newCommentArray[1];

        // add form submit
        newComment.addEventListener('submit', event => {
            event.preventDefault();

            // submit comment
            // update ui after posting.
            api.postComment(post.id, textArea.value)
                .then(response => {
                    console.log(textArea.value);
                    element.comments.push({
                        "author": localStorage.getItem('username'),
                        'comment': textArea.value
                    });
                    post.nComments++;
                    updateComments(post.id, post.nComments);
                })
                .catch(response => {
                    handleError(response);
                })
            
            // close modal
            closeModal();
        })

        showModal("New Comment", newComment);

    })

    // creating div for like and comment button
    const interactionDiv = document.createElement('div');
    interactionDiv.appendChild(likeButton);
    interactionDiv.appendChild(likeLabel);
    interactionDiv.appendChild(commentButton);
    // if it is updatable by current user add in buttons to interaction div
    if (post.author === localStorage.getItem('username')) {
        const updatableItems = updatable(post.id, post.src, api);
        // add update
        interactionDiv.appendChild(updatableItems[0]);
        // add delte
        interactionDiv.appendChild(updatableItems[1]);
    }
    
    // feed header
    feedHeader.appendChild(author);
    feedHeader.appendChild(postDate);

    // adding to card body
    cardBody.appendChild(desc);
    cardBody.appendChild(image);

    cardBody.appendChild(likes);
    cardBody.appendChild(comments);

    cardBody.appendChild(interactionDiv);
    
    // creating the card!
    // author + post date
    feedUnit.appendChild(feedHeader);
    // the entire body including
    // image, description, likes and comments
    feedUnit.appendChild(cardBody);

    return feedUnit;
}

/**
 * Given an id of a post will update with new likes number
 * @param {string} id 
 * @param {int} new number of likes
 */
function updateLikes(id, newNumber) {
    const likes = document.getElementById('likes' + id);
    if (newNumber === 0) {
        changeText(likes, "Be the first to like");
    } else if (newNumber === 1) {
        changeText(likes, "1 like");
    } else {
        changeText(likes, newNumber + " likes");
    }
}

function createInput() {;
    const form = document.createElement('form');

    const textArea = document.createElement('textarea');
    const submit = document.createElement('input');
    submit.setAttribute('type', 'submit');

    form.appendChild(textArea);
    form.appendChild(document.createElement('br'));
    form.appendChild(submit);

    return [form, textArea];
}

/**
 * Updates number of comments after user posts
 * @param {int} id post to update
 * @param {int} newNumber new comment number
 */
function updateComments (id, newNumber) {
    const comments = document.getElementById('comments' + id);
    if (newNumber === 0) {
        changeText(comments, "Comment on this post!");
    } else if (newNumber === 1) {
        console.log('hit');
        changeText(comments, "1 Comment");
    } else {
        changeText(comments, newNumber + " comments");
    }
}

/**
 * Given post id will create elements that will make the
 * post editable
 * @param {int} id postId
 */
function updatable(id, src, api) {
    // update button
    const updateButton = document.createElement('button');
    updateButton.setAttribute('class', 'btn btn-success');
    updateButton.appendChild(document.createTextNode('update'));

    // delete button
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'btn btn-danger');
    deleteButton.appendChild(document.createTextNode('delete'));

    // updating button pressed
    updateButton.addEventListener('click', event => {
        event.preventDefault();
        const inputForm = createInput();
        const form = inputForm[0];
        const textArea = inputForm[1];

        // edits post without updating live view
        form.addEventListener('submit', event => {
            event.preventDefault();
            api.editPost(id, src, textArea.value)
                .catch (response => {
                    handleError(response);
                })
            showModal("Success!", "Updated Successfully");
        })

        showModal('Update Post!', form);
        
    })

    deleteButton.addEventListener('click', event => {
        event.preventDefault();
        const deleteDiv = document.createElement('div');
        deleteDiv.appendChild(document.createTextNode('Are you sure? Close to cancel'));
        deleteDiv.appendChild(document.createElement('br'));

        const confirm = document.createElement('button');
        confirm.setAttribute('class', 'btn btn-danger');
        confirm.appendChild(document.createTextNode('Yes'));
        deleteDiv.appendChild(confirm);

        confirm.addEventListener('click', event => {
            event.preventDefault();
            api.deletePost(id)
                .catch (response => {
                    handleError(response);
                })
                showModal("Success!", "Deleted Successfully");
            
        })
        showModal('Delete Post!', deleteDiv);
    })

    return [updateButton, deleteButton];
}

