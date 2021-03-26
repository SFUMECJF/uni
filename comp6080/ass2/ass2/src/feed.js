import API from './api.js';
import { fileToDataUrl, showModal, changeContent, checkNewEmail, removeChilds} from './helpers.js';

const feed = document.getElementById('feed'),
    feedContainer = document.getElementById('feedContainer');

/**
 * Given an api will request for posts and add them to feed
 * @param {API} api 
 */
export function getNewFeed(api) {
    api.get('user/feed', localStorage.getItem('token'))
        .then(response => response.json())
        .then(jsonResponse => {
            console.log(localStorage.getItem('token'));
            console.log(jsonResponse.posts);
            
            if (jsonResponse.posts.length !== 0) {
                removeChilds(feed);
                jsonResponse.posts.forEach(element => {
                    addFeedContent(element);
                })
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
export function addFeedContent(element) {
    const meta = element.meta
    const postData = {
        'author' : meta.author,
        'postDate' : meta.published,
        'srcImage' : element.src,
        'nLikes' : meta.likes[0],
        'description' : meta.description_text,
        'nComments' : element.comments.length
    }

    // new feed unit
    const feedUnit = document.createElement('div');
    feedUnit.setAttribute('class', 'feed-unit');

    // author
    const author = document.createElement('span');
    //author.setAttribute()

    console.log(element);
}