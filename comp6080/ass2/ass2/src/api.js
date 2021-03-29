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
    getFeed(path) {
        const data = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
        }

        return fetch(`${this.url}/${path}`, data);
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

        return fetch(`${this.url}/user?id=${id}`, data);
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
        return fetch(`${this.url}/post/${like}?id=${id}`, data);
    }
}
