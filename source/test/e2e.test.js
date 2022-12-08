/// <reference types="jest" />
const { Browser } = require('puppeteer');

describe('Basic user flow for Website', () => {
  // Visit Project Website
  beforeAll(async () => {
    await page.goto('https://638b3e4c97124e1b40637544--cs-dictionary.netlify.app/');
  });
  
  it('Make sure there are no terms on initial load', async () => {
    const numRecentlyAdded = await page.$$('.recently-added-elements');
    expect(numRecentlyAdded).toEqual([{}]);
  });

  it('Check that Add Term Button Changes URL', async () => {
    const button = await page.$('.add-button');
    expect(button).not.toEqual(null);
    await button.click();
    await page.waitForNavigation();
    expect(page.url()).toBe('https://638b3e4c97124e1b40637544--cs-dictionary.netlify.app/create-term.html');
  });
   
  it('Add a new term', async () => {
    await page.goto('https://638b3e4c97124e1b40637544--cs-dictionary.netlify.app/create-term.html');

    await page.type('#term_name', 'Apple');
    await page.type('#tags', 'fruit, crisp');
    await page.type('#short_description', 'fruit, crisp');
    const button2 = await page.$('#create_button');
    await button2.click();
    await page.waitForNavigation();

    expect(page.url()).toBe('https://638b3e4c97124e1b40637544--cs-dictionary.netlify.app/home.html');
    const recentlyAdded = await page.$$('.recently-added-elements>*');     
    expect(recentlyAdded.length).toBe(1);
  });

  it('Check term is displayed in recently added', async () => {
    await page.goto('https://638b3e4c97124e1b40637544--cs-dictionary.netlify.app/');

    // only one card in recents
    const termCards = await page.$$('.recently-added-elements>term-card');
    expect(termCards.length).toBe(1);                            

    const termNameEl = await page.evaluateHandle('document.querySelector("div.recently-added > div > term-card").shadowRoot.querySelector("#term-name")');
    let termName = await page.evaluate((el) => el.textContent, termNameEl);
    expect(termName).toBe('Apple');

    const descriptionEl = await page.evaluateHandle('document.querySelector("div.recently-added > div > term-card").shadowRoot.querySelector("#description")');
    let description = await page.evaluate((el) => el.textContent, descriptionEl);
    // newline, 8 spaces, newline, 6 spaces... why
    expect(description).toBe('\n        fruit, crisp\n      ');  
  });

  it('Check popular tags are working', async () => {
    // 1 in recents, 2 tags * 5 each, total 11
    const termCards = await page.$$('term-card');
    expect(termCards.length).toBe(11);                           

    const fruitTerm = await page.evaluateHandle('document.querySelector("div.tags-section > div > div > div:nth-child(2) > term-card:nth-child(1)").shadowRoot.querySelector("#term-name")');
    let fruitTermName = await page.evaluate((el) => el.textContent, fruitTerm);
    expect(fruitTermName).toBe('Apple');

    const crispTerm = await page.evaluateHandle('document.querySelector("div.tags-section > div > div > div:nth-child(4) > term-card:nth-child(1)").shadowRoot.querySelector("#term-name")');
    let crispTermName = await page.evaluate((el) => el.textContent, crispTerm);
    expect(crispTermName).toBe('Apple');
  });

  it('Check open term works', async () => {
    const open = await page.evaluateHandle('document.querySelector("div.recently-added > div > term-card").shadowRoot.querySelector("#open_term")');
    await open.click();
    await page.waitForNavigation();
    expect(page.url()).toBe('https://638b3e4c97124e1b40637544--cs-dictionary.netlify.app/term-page.html');

    const title = await page.evaluateHandle('document.querySelector("#term-title")');
    let titleText = await page.evaluate((el) => el.textContent, title);
    expect(titleText).toBe('Apple');

    const desc = await page.evaluateHandle('document.querySelector("#term-description")');
    let descText = await page.evaluate((el) => el.textContent, desc);
    expect(descText).toBe('fruit, crisp');
  });

  it('Check delete term', async () => {
    // click delete button
    const deleteButton = await page.evaluateHandle('document.querySelector("body > main > div > button:nth-child(7)")');
    await deleteButton.click();

    // wait for popup, then confirm delete
    await page.waitForSelector('#id01', {visible: true});
    const confirmDelete = await page.evaluateHandle('document.querySelector("#id01 > form > div > div > button.deletebtn.modal-button")');
    await confirmDelete.click();

    await page.waitForNavigation();
    expect(page.url()).toBe('https://638b3e4c97124e1b40637544--cs-dictionary.netlify.app/home.html');
    
    const termCards = await page.$$('term-card');
    expect(termCards.length).toBe(0);
  });
});
