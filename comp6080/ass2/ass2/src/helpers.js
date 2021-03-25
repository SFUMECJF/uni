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
 * Creates a modal popup that covers the entire screen
 * @param {String} title 
 * @param {String} content 
 */
export function showModal(title, content) {
    let modal = document.getElementById('modalContainer');

    while (modal.hasChildNodes()) {
        modal.removeChild(modal.childNodes[0]);
    }

    // new header
    let newTitle = document.createElement('h3');
    newTitle.appendChild(document.createTextNode(title));

    // new content
    let newContent = document.createElement('div');
    newContent.appendChild(document.createTextNode(content));
    newContent.style.paddingBottom = "10%"

    // close button
    let newButton = document.createElement('button');
    newButton.appendChild(document.createTextNode("Close"));
    //newButton.setAttribute('class', submitButton);

    modal.appendChild(newTitle);
    modal.appendChild(newContent);
    modal.appendChild(newButton);
    // show modal
    modal.style.display = 'block';

    // if the user clicks close then will close modal
    newButton.addEventListener('click', event => {
        event.preventDefault();
        modal.style.display = 'none';
    });

    // closes modal if clicks outside of box
    window.addEventListener('click', event => {
        if (!event.target.closest(".modal") || event.target.closest("")) {
            modal.style.display = 'none';
        }
    });
}

// plucked from somwhere in the web
export function checkEmail(email) { 
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
} 