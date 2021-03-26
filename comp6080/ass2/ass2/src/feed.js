import API from './api.js';
import { fileToDataUrl, showModal, changeContent, checkNewEmail} from './helpers.js';

let p = 0;

export function getNewFeed() {
    requestData = {
        'token': localStorage.getItem('token'),
        'p': p,
        'n' : 1
    }
    API.get('user/feed', requestData)
        .then(response => {
            console.log(response);
        })
}