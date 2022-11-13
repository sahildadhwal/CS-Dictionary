import {initTinyMCE, getTinyMCEData} from '/src/components/tinyMCE/tiny-mce.js'

let button = document.getElementById("create-button");
console.log(button);
let term_name = document.getElementById("term_name");
let tags = document.getElementById("tags");
let short_description = document.getElementById("short_description");
let data = {};

// initTinyMCE();
console.log("Jerry told me to add a message");

// button.addEventListener('click', function() {
//     /**
//      * BACKEND:
//      * Here is where you can retrieve the input for creating a term. 
//      * With this input, you can then save it to localStorage using the code you have written.
//      */
//     data.term_name = term_name.value;
//     data.tags = tags.value;
//     data.short_description = short_description.value;
//     data.term_data = getTinyMCEData();
//     console.log(data.term_data);
// })
