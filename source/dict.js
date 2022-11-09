/**
 * @typedef {{
 *  term_name: string,
 *  tags: string[],
 *  short_description: string,
 *  term_data: Object,
 *  published: boolean,
 *  created_by: string,
 *  created_time: string,
 *  edited_by: string,
 *  edited_date: string,
 *  edit_count: number
 * }} term
 */

// Return JSON of "recently_opened"
export function getDataOfRecents() {
    const dict = loadDict();
    const recents = JSON.parse(localStorage.getItem('recents')) || [];
    let recently_opened = [];
    for(var uuid of recents) {
        let token = dict[uuid];
        recently_opened.push(token);
    }
    return recently_opened;
}

export function updateRecents(uuid) {
    let recents = JSON.parse(localStorage.getItem('recents')) || [];
    let index = recents.indexOf(uuid);
    console.log(typeof(uuid));
    if(index != -1){
        //recents.splice(index, 1);
    } else {
        if(recents.length >= 5){
            recents.splice(0, 1);
        }

    }
    recents.push(uuid);
    localStorage.setItem('recents', JSON.stringify(recents));
}

// import DOMPurify from './DOMPurify/dist/purify.es.js';
export function generateTermId() {
    return crypto.randomUUID();
};
function loadDict() {
    return JSON.parse(localStorage.getItem('terms')) || {};
}
function archiveDict(dict) {
    localStorage.setItem('terms', JSON.stringify(dict));
}
export function insertTerm(term) {
    const dict = loadDict();
    const termId = generateTermId();
    dict[termId] = term;
    archiveDict(dict);
    location.reload();
    return blogId;
}
export function selectTerm(termId) {
    const dict = loadDict();
    return dict[termId];
}
export function selectDict() {
    const dict = loadDict();
    return dict;
}

export function updateTerm(termId, term) {
    const dict = loadDict();
    term.edit_count += 1;
    dict[termId] = term;
    archiveDict(dict);
}

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

export function termsCount() {
    const dict = loadDict();
    return Object.keys(dict).length;
}

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
    renderAllTerms(document.getElementById('dict'));
}
export function deleteAll() {
    const dict = selectDict();

    for(const [termId, term] of Object.entries(dict)){
        deleteTerm(termId);
    }
    renderAllTerms(document.getElementById('dict'));
}

export function showDialog(){
    document.getElementById('term_template').style.display = 'block';
}
export function cancel(){
    document.getElementById('term_template').style.display = 'none';
}