/**
 * @typedef {{
 *  id: string,
 *  type: string,
 *  data: Object.<string, (text|number)>
 * }} data_block
 * 
 * @typedef {{
 *  time: number,
 *  blocks: data_block[],
 *  version: string
 * }} term_data
 *
 * @typedef {{
 *  term_name: string,
 *  tags: string[],
 *  short_description: string,
 *  term_data: term_data,
 *  published: boolean,
 *  created_by: string,
 *  created_time: string,
 *  edited_by: string,
 *  edited_date: string,
 *  edit_count: number
 * }} term
 */

/**
 * Return term objects that are recently viewed by user.
 * @return {term[]} An array of term objects, size <= 5
 */
export function getDataOfRecents() {
    x = {1:2}
    const dict = loadDict();
    const recents = JSON.parse(localStorage.getItem('recents')) || [];
    let recently_opened = [];
    for(var uuid of recents) {
        let token = dict[uuid];
        recently_opened.push(token);
    }
    return recently_opened;
}

/**
 * Update the array of recent terms so that the term is marked as being most
 * recently viewed. Only the 5 most recently viewed terms are saved.
 * @param {string} uuid The uuid of the recently viewed term
 */
export function updateRecents(uuid) {
    let recents = JSON.parse(localStorage.getItem('recents')) || [];
    let index = recents.indexOf(uuid);
    console.log(typeof(uuid));
    if(index != -1){
        recents.splice(index, 1);
    } else {
        if(recents.length >= 5){
            recents.splice(0, 1);
        }

    }
    recents.push(uuid);
    localStorage.setItem('recents', JSON.stringify(recents));
}

// import DOMPurify from './DOMPurify/dist/purify.es.js';
/**
 * Generate a random ID.
 * @returns {string} A random uuid.
 */
export function generateTermId() {
    return crypto.randomUUID();
};

/**
 * Load the dictionary of all terms. Key is the random term id. Value is the object.
 * @returns {Object.<string, term>} An dictionary
 */
function loadDict() {
    return JSON.parse(localStorage.getItem('terms')) || {};
}

/**
 * Save the given dictionay to `localstorage`.
 * @param {Object.<string, term>} dict A dictionary of `uuid: term` pairs
 */
function archiveDict(dict) {
    localStorage.setItem('terms', JSON.stringify(dict));
}

/**
 * Put the given term into the database.
 * @param {term} term A term object
 * @returns {string} The id of the ?
 */
export function insertTerm(term) {
    const dict = loadDict();
    const termId = generateTermId();
    dict[termId] = term;
    archiveDict(dict);
    location.reload(); //FIXME: the website action after a term is inserted
    return blogId; //FIXME: what to return after `insertItem`
}

/**
 * Get the term of the uuid.
 * @param {string} termId The uuid of a term
 * @returns {string} The term corresponding to the termId
 */
export function selectTerm(termId) {
    const dict = loadDict();
    return dict[termId];
}

/**
 * //FIXME: duplicate with `loadDict`
 * Same as `loadDict`
 * @returns {Object.<string, term>} A dictionary of terms
 */
export function selectDict() {
    const dict = loadDict();
    return dict;
}

/**
 * Update an existing term.
 * @param {string} termId The uuid of a term
 * @param {term} term A term object
 */
export function updateTerm(termId, term) {
    const dict = loadDict();
    term.edit_count += 1;
    //FIXME: edited_by, edited_time
    dict[termId] = term;
    archiveDict(dict);
}

/**
 * Remove a term from `localstorage`.
 * @param {string} termId The uuid of a term
 * @returns {boolean} `true` if success; `false` otherwise
 */
export function deleteTerm(termId) {
    const dict = loadDict();
    if (!(termId in dict)){
        return false;
    } 
    delete dict[termId];
    archiveDict(dict);
    location.reload();
    return true;
}

/**
 * Return the number of existing terms in `localstorage`.
 * @returns {number} The number of existing terms.
 */
export function termsCount() {
    const dict = loadDict();
    return Object.keys(dict).length;
}

/**
 * Return an html element that randered the given term using the template
 * specified in the html file.
 * @private
 * @param {string} termId The uuid of a term
 * @param {term} term A term object
 * @returns {HTMLElement} A `dict_entry` element of the term
 */
export function renderTerm(termId, term) {
    const template = document.getElementById("dict_template");

    const termE1 = template.content.cloneNode(true);
    termE1.children[0].dataset.termId = termId;


    const nameH1 = termE1.querySelector('term_name > h1');
    nameH1.textContent = term.name;

    const tagUL1 = termE1.querySelector('tags > ul');
    for(let i = 0; i < term.tags.length; i++){
        tagUL1.innerHTML += '<li>' + term.tags[i] + '</li>';
    }

    return termE1;
}
/**
 * Render all terms into elements and put them into the `term_container`.
 * @private
 * @param {HTMLElement} term_container  An HTML element to contain the term elements
 * @returns {boolean} `true` if success
 */
export function renderAllTerms(term_container) {
    const dict = selectDict();

    for(const [termId, term] of Object.entries(dict)){
        const termE1 = renderTerm(termId, term);
        const existingTerm = term_container.querySelector(`[data-term-id="${termId}"]`);
        if (existingTerm) {
            existingTerm.remove();
        }

        term_container.appendChild(termE1);
    }    

    return true;
}

/**
 * Add a new term with data from user input.
 * @private
 */
export function add(){
    document.getElementById('term_template').style.display = 'none';
    //const name = DOMPurify.sanitize(document.getElementById('name').value);
    const name = document.getElementById('name').value;
    //const tags_str = DOMPurify.sanitize(document.getElementById('tags').value);
    const tags_str = document.getElementById('tags').value;
    //const short_description = DOMPurify.sanitize(document.getElementById('definition').value);
    const short_description = document.getElementById('definition').value;
    const cur_time = new Date();
    const term_container = document.getElementById('dict');
    const term = {};
    term['term_name'] = name;
    term['tags'] = tags_str.split(',');
    term['short_description'] = short_description;
    term['term_data'] = {};
    term['published'] = false;
    term['created_by'] = 'placeholder';
    term['created_time'] = cur_time;
    term['edited_by'] = 'placeholder';
    term['edited_date'] = cur_time;
    term['edit_count'] = 0;
    insertTerm(term);
    renderAllTerms(term_container);
}

/**
 * Clear all terms in `localstorage`
 */
export function deleteAll() {
    const dict = selectDict();
    // FIXME: just save with empty dict?
    // FIXME: delete other data in dict?
    for(const [termId, term] of Object.entries(dict)){
        deleteTerm(termId);
    }
    renderAllTerms(document.getElementById('dict'));
}

/**
 * Show user input dialog.
 * @private
 */
export function showDialog(){
    document.getElementById('term_template').style.display = 'block';
}
/**
 * Hide user input dialog.
 * @private
 */
export function cancel(){
    document.getElementById('term_template').style.display = 'none';
}