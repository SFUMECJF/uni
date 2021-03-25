/*
    this is the file for task 4. 
    It includes all scripts required for the operation of the field table
    and is referenced at the beginning of the index file for task4.

    Created March 2021
    By John Dao
    z5258962
*/

// Selects all boxes/deselects all boxes give the requirements via the spec
const tickAll = () => {
    let checkedAll = true;

    // checks the current states of all checkboxes
    for (i = 0; i < 4; i++) {
        let checked = document.getElementById("f" + i.toString()).checked;
        if (!checked) {
            checkedAll = false; 
            break;
        }
    }

    // if all are checked, then unticks all
    if (checkedAll) {
        for (i = 0; i < 4; i++) {
            document.getElementById("f"+ i.toString()).checked = false;
        }
    // if not all are checked, then will check all
    } else {
        for (i = 0; i < 4; i++) {
            if (!document.getElementById("f"+ i.toString()).checked) {
                document.getElementById("f"+ i.toString()).checked = true;
            }
        } 
    }
}

// counts the number of features ticked
const listTicked = () => {
    let list = [];
    for (i = 0; i < 4; i++) {
        let checked = document.getElementById("f" + i.toString()).checked;
        if (checked) {
            list.push(document.getElementById("f" + i.toString()).name.toString());
        }
    }
    return list;
}


// resets all fields 
const resetAll = () => {
    allInputs = ["streetName", "subName", "postcode", "dob"];

    // resets all text and date inputs
    for (i = 0; i < 4; i++) {
        let val = document.getElementById(allInputs[i]);
        if (val) {val.value = ""};
    }
    
    // sets the building type to apartment (the default)
    let val1 = document.getElementById("bType").value;
    if (val1) {val1 = 0;}

    // resets all checkboxes to be unchecked
    for (i = 0; i < 4; i++) {
        document.getElementById("f" + i.toString()).checked = false;
    }

    // clears the result box
    document.getElementById("resultBox").innerHTML = "";
}

// checks strings and if they're between 5 and 50 characters (inclusive)
const checkString = (string, type) => {
    let textArea = document.getElementById("resultBox");

    // checks if string is between 3 and 50 characters (inclusive)
    // valid string
    if (string.length >= 3 && string.length <= 50) {
        textArea.innerHTML = "";
        return string;
    // invalid string
    } else {
        textArea.innerHTML = "Please input a valid " + type;
        return false;
    }
}

// checks postcode for validity
const checkPostcode = () => {
    let textArea = document.getElementById("resultBox");
    const postcode = document.getElementById("postcode").value;

    // checks for postcode validity
    // valid postcode
    if (!isNaN(postcode) && postcode.toString().length === 4) {
        textArea.innerHTML = "";
        return postcode;
    // invalid postcode
    } else {
        textArea.innerHTML = "Please input a valid postcode";
        return false;
    }
}

// checks DOB for validity
const checkDOB = () => {
    let textArea = document.getElementById("resultBox");
    let dob = document.getElementById("dob").value.toString().split("/");
    dob = dob[1] + "/" + dob[0] + "/" + dob[2];
    // transforming into date
    let pDob = new Date(dob);
    // testing regex
    let regex = new RegExp("[0-9]{2}/[0-9]{2}/[0-9]{4}")

    // if date is invalid or regex fails
    if (isNaN(pDob) || !regex.test(dob)) {
        textArea.innerHTML = "Please input a valid date of birth";
        return false;
    // correct date
    } else {
        textArea.innerHTML = "";
        return pDob;
    }
}

// calculates an individuals age given their date of birth in dob
const calculateAge = (dob) => {
    let months = Date.now() - dob.getTime();
    let ageDate = new Date(months);
    let year = ageDate.getUTCFullYear();

    age = Math.abs(year-1970);
    return age;
}

// prints the description as required from the spec
// will only fill if given all sections are valid
const printDesc = (streetName, suburb, postcode, age) => {
    let textArea = document.getElementById("resultBox");
    // first sentnce autofil + empty second sentence
    let firstSentence = "Your are " + age + " years old, and your address is " + streetName + " St, " + suburb + ", " + postcode + ", Australia. ";
    let secondSentence;

    // building type in text
    let bType = "an apartment";
    if (document.getElementById("bType").value === "1") {bType = "a house";}
    
    // listing features
    let list = listTicked();
    let features = "and it has ";
    if (list.length === 0) {
        features += "no features";
    } else if (list.length === 1) {
        features += list[0].toString();
    } else {
        for (i = 0; i < (list.length - 1); i++) {
            features += list[i]; 
            features += ", "
        }
        features += "and ";
        features += list[list.length-1];
    }

    // filling out second sentence
    secondSentence = "Your building is " + bType + ", " + features;

    // filling out textarea
    textArea.innerHTML = firstSentence + secondSentence;
}

// checks all inputs on the form that can be checked for validity
const checkAll = () => {
    let streetName;
    let suburb;
    let postcode;
    let age;

    // all checks required to pass
    if (!checkString(document.getElementById("streetName").value.toString(), "street name")) {
        return;
    } else {
        streetName = checkString(document.getElementById("streetName").value.toString(), "street name");
    }

    if (!checkString(document.getElementById("subName").value.toString(), "suburb")) {return;
    } else {
        suburb = checkString(document.getElementById("subName").value.toString(), "suburb");
    }

    if (!checkPostcode()) {
        return;
    } else {
        postcode = checkPostcode();
    }

    if (!checkDOB()) {
        return;
    } else {
        age = calculateAge(checkDOB());
    }

    // runs the final print if the fields are valid. 
    // Will continually update in case that there are changes to the form
    printDesc(streetName, suburb, postcode, age);
}
