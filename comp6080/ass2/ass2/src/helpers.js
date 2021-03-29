/**
 * Given a js file object representing a jpg or png image, such as one taken
 * from a html file input element, return a promise which resolves to the file
 * data as a data url.
 * More info:
 *   https://developer.mozilla.org/en-US/docs/Web/API/File
 *   https://developer.mozilla.org/en-US/docs/Web/API/FileReader
 *   https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
 * 
 * Example Usage:
 *   const file = document.querySelector('input[type="file"]').files[0];
 *   console.log(fileToDataUrl(file));
 * @param {File} file The file to be read.
 * @return {Promise<string>} Promise which resolves to the file as a data url.
 */
export function fileToDataUrl(file) {
    const validFileTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ]
    const valid = validFileTypes.find(type => type === file.type);
    // Bad data, let's walk away.
    if (!valid) {
        throw Error('provided file is not a png, jpg or jpeg image.');
    }
    
    const reader = new FileReader();
    const dataUrlPromise = new Promise((resolve,reject) => {
        reader.onerror = reject;
        reader.onload = () => resolve(reader.result);
    });
    reader.readAsDataURL(file);
    return dataUrlPromise;
}

/**
 * Removes all child nodes in given element
 * @param {HTMLElement} element 
 */
export function removeChilds(element) {
    while(element.hasChildNodes()) {
        element.removeChild(element.childNodes[0]);
    }
}

/**
 * Creates a modal popup that covers the entire screen
 * @param {String} title 
 * @param {String or HTMLElement} content 
 */
export function showModal(title, content) {
    const modal = document.getElementById('modalContainer');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent')
    const closebutton = document.getElementById('modalClose')
    removeChilds(modalTitle);
    removeChilds(modalContent);
    // new header
    let newTitle = document.createElement('h3');
    newTitle.appendChild(document.createTextNode(title));

    // new content
    let newContent = document.createElement('div');
    if (typeof content === 'string') {
        newContent.appendChild(document.createTextNode(content));
    } else {
        newContent.appendChild(content);
    }

    // close button
    let newButton = document.createElement('button');
    newButton.appendChild(document.createTextNode("Close"));

    modalTitle.appendChild(newTitle);
    modalContent.appendChild(newContent);

    // show modal
    modal.style.display = 'block'; 

    // if the user clicks close then will close modal
    closebutton.addEventListener('click', event => {
        event.preventDefault();
        modal.style.display = 'none';
    });
}



/**
 * Given an email, will return whether it is a real email via regex
 * @param {string} newEmail 
 * @returns boolean
 */
export function checkNewEmail(newEmail) {
    const regex = /^[^\s@]+@[^\s@]+$/;
    return regex.test(newEmail);
}

/**
 * Given a single element, will change the text content within
 * @param {HTMLElement} element 
 * @param {String} newContent 
 */
export function changeText(element, content) {
    // only edits if the element exists on the page
    if (element !== null) {
        if (element.firstChild !== null) {
            removeChilds(element);
        }
    
        var newContent = document.createElement('span');
    
        newContent.appendChild(document.createTextNode(content));
        element.appendChild(newContent);
    }

}

/**
 * Given a message, will print an error message in both the console and to the user
 * Handles going suddenly offline sometimes as well through
 * the 'failed to fetch' error being printed 
 * until there is a refresh and it says no internet
 * @param {mixed} message 
 */
export function handleError(message) {
    console.log("ERROR", message);
    if (message !== undefined) {
        showModal("ERROR!", message.toString());
    } else {
        showModal("ERROR!", "");
    }
}

/**
 * given an api will set user id to localStorage
 * @param {api} api 
 */
export function setUserDetails(api) {
    return (api.getCurrentUserId()
        .then(response => {
            localStorage.setItem('id', response.id);
            localStorage.setItem('username', response.username);
            localStorage.setItem('following', response.following);
        })
        .catch(response => {
            handleError(response);
        })
    );
}

/**
 * removes all sensitive data stored in local storage due to login
 */
export function removeUserDetails() {
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('following');
    localStorage.removeItem('token');
}

/**
 * Given the id of a user, will remove the id from the 
 * local storage follow list and update it
 * @param {int} id 
 */
export function removeFollow(id) {
    let followArray = localStorage.getItem('following');
    let counter = 0;
    while (counter < followArray.length) {
        if (followArray[counter] === id) {
            followArray.splice(counter, 1);
        }
    }
    localStorage.setItem('following', followArray);
}

/**
 * removes the feed view for re-initialisation
 */
export function removeFeed() {
    const feed = document.getElementById('feedContainer');
    removeChilds(feed);
}

/**
 * Given a list of ids, will create a list of users that the person
 * follows
 * @param {array} followList 
 * @param {API} api 
 * @returns 
 */
export function createFollowingList(followList, api) {
    const newList = document.createElement('ul');
    if (followList.length === 0) {
        return document.createElement('text').appendChild(document.createTextNode('Not following anyone'));
    } else {
        followList.forEach(id => {
            api.getUsernameById(id)
                .then(response => {
                    let newUser = document.createElement('li');
                    newUser.appendChild(document.createTextNode(response.username));
                    newList.appendChild(newUser);
                })
        });
        return newList;
    }
}

/**
 * Closes Modal that is presumed open
 * Does nothing if modal is already closed
 */

export function closeModal() {
    // close modal
    const modal = document.getElementById('modalContainer');
    modal.style.display = 'none';
}