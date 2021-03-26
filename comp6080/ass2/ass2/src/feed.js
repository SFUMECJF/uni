import API from './api.js';
import { fileToDataUrl, showModal, checkNewEmail, removeChilds, createLikeList} from './helpers.js';


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
            if (jsonResponse.posts !== undefined) {
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
            console.log(response.message)
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
    if (post.nLikes === 0) {
        likes.appendChild(document.createTextNode("Be the first to like"))
    } else if (post.nLikes === 1) {
        likes.appendChild(document.createTextNode("1 like"));
    } else {
        likes.appendChild(document.createTextNode(post.nLikes + " likes"))
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
        comments.appendChild(document.createTextNode(post.nLikes + " comments"))

    }

    // feed header
    feedHeader.appendChild(author);
    feedHeader.appendChild(postDate);

    // adding to card body
    cardBody.appendChild(desc);
    cardBody.appendChild(image);
    cardBody.appendChild(likes);
    cardBody.appendChild(comments);

    // adding listeners
    // like listener button to list
    likes.addEventListener('click', event => {
        event.preventDefault();

        showModal("Likes", createLikeList(meta.likes, api));
    })

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
    
    
    // creating the card!
    // author + post date
    feedUnit.appendChild(feedHeader);
    // the entire body including
    // image, description, likes and comments
    feedUnit.appendChild(cardBody);
    return feedUnit
}