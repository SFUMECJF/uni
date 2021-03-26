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
 * @param {String} content 
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
    newContent.appendChild(document.createTextNode(content));

    // close button
    let newButton = document.createElement('button');
    newButton.appendChild(document.createTextNode("Close"));
    //newButton.setAttribute('class', submitButton);

    modalTitle.appendChild(newTitle);
    modalContent.appendChild(newContent);

    // show modal
    modal.style.display = 'block';

    // if the user clicks close then will close modal
    closebutton.addEventListener('click', event => {
        event.preventDefault();
        modal.style.display = 'none';
    });

    /*
    // closes modal if clicks outside of box
    window.addEventListener('click', event => {
        if (!event.target.closest(".modal") || event.target.closest("")) {
            modal.style.display = 'none';
        }
    });
    */
}

/**
 * Given a single element, will change the text content within
 * @param {HTMLElement} element 
 * @param {String} newContent 
 */
export function changeContent(element, content) {
    removeChilds(element);
    var newContent = document.createElement('span');

    newContent.appendChild(document.createTextNode(content));
    element.appendChild(newContent);
}

// checks if new email is valid
export function checkNewEmail(newEmail) {
    const regex = /^[^\s@]+@[^\s@]+$/;
    return regex.test(newEmail);
}