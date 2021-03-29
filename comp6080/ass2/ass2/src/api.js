/**
 * Make a request to `path` with `options` and parse the response as JSON.
 * @param {*} path The url to make the reques to.
 * @param {*} options Additiona options to pass to fetch.
 */
const getJSON = (path, options) => 
    fetch(path, options)
        .then(res => res.json())
        .catch(err => console.warn(`API_ERROR: ${err.message}`));

/**
 * This is a sample class API which you may base your code on.
 * You may use this as a launch pad but do not have to.
 */
export default class API {
    /** @param {String} url */
    constructor(url) {
        this.url = url;
    } 

    /** @param {String} path */
    makeAPIRequest(path) {
        return getJSON(`${this.url}/${path}`);
    }

    /**
     * authentication used for login and signup 
     * @param {String} path
     * @param {JSON} requestData
     */
    auth(path, requestData) {
        const data = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
                
            },
            body: JSON.stringify(requestData)
        }

        return fetch(`${this.url}/${path}`, data);
    }

    /**
     * Will return fetch feed of given user that is logged in
     * @param {string} path 
     * @returns fetch 
     */
    getFeed(path, p) {
        const data = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
        }

        return fetch(`${this.url}/${path}?p=${p}`, data).then(feed => feed.json());
    }

    /**
     * Given User id, will return username fetch
     * @param {int} id 
     * @returns fetch
     */
    getUsernameById(id) {
        const data = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'query': id
            },
        }

        return fetch(`${this.url}/user?id=${id}`, data).then(user => user.json());
    }
    /**
     * get current user id
     * @returns fetch
     */
    getCurrentUserId() {
        const data = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
            },
        }

        return fetch(`${this.url}/user`, data);
    }

    /**
     * Given an id, will attempt to like the post
     * Like will allow for unlike or like
     * @param {string} id 
     * @param {string} like
     */
    like(id, like) {
        const data = {
            method: 'PUT',
            headers: {
                'content-type' : 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'query': id
            },
        }
        return fetch(`${this.url}/post/${like}?id=${id}`, data).then(like => like.json());
    }
    /**
     * Given a username, will fetch userdata
     * @param {string} username 
     * @returns fetch username
     */
    getUser(username) {
        const data = {
            method: 'GET',
            headers: {
                'content-type' : 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
        }
        return fetch(`${this.url}/user?username=${username}`, data).then(user => user.json());
    }

    /**
     * Given an id id and string payload, will post comment to post
     * id with id with content payload
     * @param {int} id 
     * @param {string} payload 
     * @returns 
     */
    postComment(id, payload) {
        const data = {
            method: 'PUT',
            headers : {
                'content-type' : 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                "comment": payload
            })
        }
        return fetch(`${this.url}/post/comment?id=${id}`, data);
    }
    /**
     * Given uId will follow/unfollow
     * @param {string} username 
     * @param {string} follow Type of follow/unfollow
     */
    follow(username, follow) {
        const data = {
            method: 'PUT',
            headers: {
                'content-type' : 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
            },
        }
        return fetch(`${this.url}/user/${follow}?username=${username}`, data);
    }

    getPost(id) {
        const data = {
            method: 'GET',
            headers: {
                'content-type' : 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
            },
        }
        return fetch(`${this.url}/post?id=${id}`, data).then(post => post.json());
    }
}
