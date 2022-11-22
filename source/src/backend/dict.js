/**
 * @typedef {{
 *  id: string,
 *  type: string,
 *  data: Object.<string, (text|number)>
 * }} dataBlock
 * 
 * @typedef {{
 *  time: number,
 *  blocks: dataBlock[],
 *  version: string
 * }} termData
 *
 * @typedef {{
 *  id: string,
 *  termName: string,
 *  tags: string[],
 *  shortDescription: string,
 *  termData: termData,
 *  published: boolean,
 *  createdBby: string,
 *  createdTime: string,
 *  editedBy: string,
 *  editedDate: string,
 *  editCount: number
 * }} term
 */

/**
 * Popular tags functions
 */

/**
 * Get the most popular tags.
 * @param {number=} [count] Number of popular tags to return. If count is undefined,
 *  then all tags are returned.
 * @returns {string[]} An array of popular tags.
 */
export function getPopularTags(count) {
  const tagCounts = JSON.parse(localStorage.getItem('tagCounts')) || {};
  const popularTags = Object.keys(tagCounts).sort(
    (t1, t2) => tagCounts[t2] - tagCounts[t1]
  );
  return popularTags.slice(0, count);
}

/**
 * Return all terms which has the specified tag.
 * @param {string} tag Name of a tag
 * @returns {term[]} An array of all terms with this tag
 */
export function getDataOfTag(tag) {
  const dict = loadDict();
  const uuids = JSON.parse(localStorage.getItem('tags'))[tag] || [];
  const terms = [];
  for(const uuid of uuids) {
    const token = dict[uuid];
    terms.push(token);
  }
  return terms;
}

/**
 * Get some random terms with the specified tag.
 * @param {string} tag Name of a tag that the terms have
 * @param {number} [count=5] Number of terms to return. Default is 5.
 * @returns {term[]} An array of some terms that has the given tag
 */
export function getRandomTermsOfTag(tag, count=5) {
  const dict = loadDict();
  const uuids = JSON.parse(localStorage.getItem('tags'))[tag] || [];
  // get some random uuids
  const randomUuids = [];
  for (let i = 0; i < Math.min(uuids.length, count); i++) {
    let idx = Math.floor(Math.random() * uuids.length);
    while (uuids[idx] in randomUuids) {
      idx = Math.floor(Math.random() * uuids.length);
    }
    terms.push(uuids[idx]);
  }
  // convert uuid to term
  const terms = [];
  for(const uuid of randomUuids) {
    const token = dict[uuid];
    terms.push(token);
  }
  return terms;
}

/**
 * Get the first 5 terms of a tag
 * @param {string} tag_name the name of the tag you want the top 5 of
 * @returns {term[]} array of 5 terms
 */
export function top5terms(tagName) {
  const dict = loadDict();
  const tags = JSON.parse(localStorage.getItem('tags')) || {};
  const termsOfTag = tags[tagName];
  const top5 = [];
  for(let i = 0; i < 5; i++) {
    // push term objects
    top5.push(dict[termsOfTag[i]]);
  }
  return top5;
}

/**
 * Return an array of popular tags and their terms.
 * @returns {Array.<{tagName: string, terms: term[]}>} An array of dicts with
 * tag name as key and 5 terms in an array as value
 */
export function getAllPopTags() {
  const tag_set = getPopularTags(3);
  let tags_dict = [];
  for(let i = 0; i < tag_set.length; i++){
    tags_dict.push({tag_name: tag_set[i], terms: top5terms(tag_set[i])});
    // tagsDict[tagSet[i]] = top5terms(tagSet[i]);
  }
  return tags_dict;
}

/**
 * Add uuid of a term to tags' uuid lists
 * @param {term} term A term with some tags
 */
export function updateTags(term) {
  const tagsDict = JSON.parse(localStorage.getItem('tags')) || {};

  for (const tag of term.tags) {
    tagsDict[tag] = tagsDict[tag] || [];
    if (term.id in tagsDict[tag]) continue;
    tagsDict[tag].push(term.id);
  }
  localStorage.setItem('tags', JSON.stringify(tagsDict));
}

/**
 * Increase the number of views of the tags of a term
 * @param {term} term 
 */
export function updateTagCount(term) {
  const tagCounts = JSON.parse(localStorage.getItem('tagCounts')) || {};

  for (const tag of term.tags) {
    tagCounts[tag] = tagCounts[tag] || 0;
    tagCounts[tag]++;
  }

  localStorage.setItem('tagCounts', JSON.stringify(tagCounts));
}

/**
 * Return term objects that are recently viewed by user.
 * @return {term[]} An array of term objects, size <= 5
 */
export function getDataOfRecents() {
  const dict = loadDict();
  const recents = JSON.parse(localStorage.getItem('recents')) || [];
  const recentlyOpened = [];
  for(const uuid of recents) {
    const token = dict[uuid];
    recentlyOpened.push(token);
  }
  return recently_opened;
}

/**
 * Update the array of recent terms so that the term is marked as being most
 * recently viewed. Only the 5 most recently viewed terms are saved.
 * @param {string} uuid The uuid of the recently viewed term
 */
export function updateRecents(uuid) {
  const recents = JSON.parse(localStorage.getItem('recents')) || [];
  const index = recents.indexOf(uuid);
  if(index !== -1){
    recents.splice(index, 1);
  } else {
    if(recents.length >= 5){
      recents.splice(0, 1);
    }
  }
  recents.push(uuid);
  localStorage.setItem('recents', JSON.stringify(recents));
}

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
 * // FIXME: duplicate with `loadDict`
 * Same as `loadDict`
 * @returns {Object.<string, term>} A dictionary of terms
 */
export function selectDict() {
  const dict = loadDict();
  return dict;
}

/**
 * Clear all terms in `localstorage`
 */
export function deleteAll() {
  const dict = loadDict();
  for(const [_, term] of Object.entries(dict)){
    deleteTerm(term);
  }
  // renderAllTerms(document.getElementById('dict'));
}

/**
 * Generate a random ID.
 * @returns {string} A random uuid.
 */
export function generateTermId() {
  return crypto.randomUUID();
}

/**
 * Put the given term into the database.
 * @param {term} term A term object
 * @returns {string} The id of the new term
 */
export function insertTerm(term) {
  // TODO: Decide how we are going to handle duplicate (consult with team)
  let dict = loadDict();
  term.id = generateTermId();
  dict[term.id] = term;
  archiveDict(dict);
  updateRecents(term.id);
  // location.reload();
  return term.id;
}

/**
 * Get the term of the uuid.
 * @param {string} term_id The uuid of a term
 * @returns {string} The term corresponding to the termId
 */
export function selectTerm(term_id) {
  const dict = loadDict();
  return dict[term_id];
}

/**
 * Update an existing term.
 * @param {term} term A term object
 */
export function updateTerm(term) {
  const curTime = new Date();
  let dict = loadDict();
  term.editCount += 1;
  term.editedDate = curTime;
  term.editedBy = 'user';
  dict[term.id] = term;
  archiveDict(dict);
}

/**
 * Remove a term from `localstorage`.
 * @param {term} term The term
 * @returns {boolean} `true` if success; `false` otherwise
 */
export function deleteTerm(term) {
  const dict = loadDict();
  if (!(term.id in dict)) {
    return false;
  }
  delete dict[term.id];
  const tags = JSON.parse(localStorage.getItem('tags'));
  for (const tag of term.tags) {
    const uuids = tags[tag] || [];
    if (term.id in uuids) {
      const i = uuids.indexOf(term.id);
      tags[tag].splice(i, 1);
    }
    archiveDict(dict);
    localStorage.setItem('tags', tags);
    return true;
  }
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
 * Add a term to the `localstorage` and update corresponding params in `localstorage`
 * while storing the embedded data using TinyMCE
 * @param {term} term a new term
 */
export function addTermToBackend(term){
  const curTime = new Date();
  term['tags'] = term.tags.split(',');
  for (const i in term['tags']) {
    term['tags'][i] = term['tags'][i].trim();
    if (term['tags'][i] === '') {
      term['tags'].splice(i, 1);
    }
  }
  term['createdBy'] = 'placeholder';
  term['createdTime'] = curTime;
  term['editedBy'] = 'placeholder';
  term['editedDate'] = curTime;
  term['editCount'] = 0;
  insertTerm(term);
  updateTags(term);
  updateTagCount(term);
}

/**
 * @deprecated
 */
export function addTermToDoc(term) {
  addTermToBackend(term);
}
/**
 * 
 * @param {string} input //The user input to the search bar
 * @param {boolean} s_term //Is Term checked?
 * @param {boolean} s_tag //Is Tag checked?
 * @param {boolean} s_description //Is description checked?
 * @return {term[]} //Returns a list of all the term IDs associated with the search 
 */
export function findRequestedTerm(input, s_term, s_tag, s_description){
  const dict = loadDict();
  let search_result = [];
  for (const [id, term] of Object.entries(dict)) {
    if(!s_term && !s_tag && !s_description){ //If all boxes unchecked, default to Term
      s_term = true;
    }
    if(s_term){
      if(term.term_name.includes(input)){
        if(!search_result.includes(term)){
          search_result.push(term);
        }
      }
    }
    if(s_description){
      if(term.short_description.includes(input)){
        if(!search_result.includes(term)){
          search_result.push(term);
        }
      }
    }
  }    
  if(s_tag){
    const tag_counts = JSON.parse(localStorage.getItem('tag_counts'))
    if(Object.keys(tag_counts).includes(input)){
      const term_set = getDataOfTag(input);
      for(const token of term_set){
        if(!search_result.includes(token)){
          search_result.push(token);
        }
      }
    }
  }
  return search_result;
} 
