/// <reference types="jest" />
const { Browser } = require('puppeteer');

const baseUrl = 'https://cs-dictionary.netlify.app/';

describe('Basic user flow for Website', () => {
  // Visit Project Website
  beforeAll(async () => {
    await page.goto(baseUrl);
  });
  
  it('Make sure there are no terms on initial load', async () => {
    const numRecentlyAdded = await page.$$('.recently-added-elements');
    expect(numRecentlyAdded).toEqual([{}]);
  });

  it('Check that Add Term Button changes URL', async () => {
    const button = await page.$('.add-button');
    expect(button).not.toEqual(null);
    await button.click();
    await page.waitForNavigation();
    expect(page.url()).toBe(`${baseUrl}create-term.html`);
  });
   
  it('Add a new term', async () => {
    await page.goto(`${baseUrl}create-term.html`);

    await page.type('#term-name', 'Apple');
    await page.type('#tags', 'fruit, crisp');
    await page.type('#short-description', 'fruit, crisp');
    const button2 = await page.$('#create-button');
    await button2.click();
    await page.waitForNavigation();

    expect(page.url()).toBe(`${baseUrl}term-page.html`);
  });

  it('Check term is displayed in recently added', async () => {
    await page.goto(baseUrl);
    
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

  it('Check term is displayed in popular tags', async () => {
    // term appears in recents, fruit tag, crisp tag
    const termCards = await page.$$('term-card');
    expect(termCards.length).toBe(3);                           

    const fruitTerm = await page.evaluateHandle('document.querySelector("div.tags-section > div > div:nth-child(2) > term-card").shadowRoot.querySelector("#term-name")');
    let fruitTermName = await page.evaluate((el) => el.textContent, fruitTerm);
    expect(fruitTermName).toBe('Apple');

    const crispTerm = await page.evaluateHandle('document.querySelector("div.tags-section > div > div:nth-child(4) > term-card").shadowRoot.querySelector("#term-name")');
    let crispTermName = await page.evaluate((el) => el.textContent, crispTerm);
    expect(crispTermName).toBe('Apple');
  });

  it('Check open term works', async () => {
    const open = await page.evaluateHandle('document.querySelector("div.recently-added > div > term-card").shadowRoot.querySelector("#open_term")');
    await open.click();
    await page.waitForNavigation();
    expect(page.url()).toBe(`${baseUrl}term-page.html`);

    const title = await page.evaluateHandle('document.querySelector("#term-title")');
    let titleText = await page.evaluate((el) => el.textContent, title);
    expect(titleText).toBe('Apple');

    const desc = await page.evaluateHandle('document.querySelector("#term-description")');
    let descText = await page.evaluate((el) => el.textContent, desc);
    expect(descText).toBe('fruit, crisp');
  });

  it('Check upate term', async () => {
    // click update button
    const updateButton = await page.$('#update-button');
    await updateButton.click();

    // wait for page load
    await page.waitForNavigation();
    expect(page.url()).toBe(`${baseUrl}update-term.html`);

    // update tags and description
    await page.type('#tags', ', red');
    await page.type('#short-description', ', tasty');
    const updateButton2 = await page.$('#update-button');
    await updateButton2.click();

    // check term-card count in home page
    await page.goto(baseUrl);
    const termCards = await page.$$('term-card');
    expect(termCards.length).toBe(4); 

    // check term description after update
    const descriptionEl = await page.evaluateHandle('document.querySelector("div.recently-added > div > term-card").shadowRoot.querySelector("#description")');
    let description = await page.evaluate((el) => el.textContent, descriptionEl);
    expect(description).toBe('\n        fruit, crisp, tasty\n      '); 
  });

  it('Check delete term', async () => {
    await page.goto(baseUrl);

    // open term
    const open = await page.evaluateHandle('document.querySelector("div.recently-added > div > term-card").shadowRoot.querySelector("#open_term")');
    await open.click();
    await page.waitForNavigation();
    expect(page.url()).toBe(`${baseUrl}term-page.html`);

    // click delete button
    const deleteButton = await page.$('#delete-button');
    await deleteButton.click();

    // wait for popup, then confirm delete
    await page.waitForSelector('#id01', {visible: true});
    const confirmDelete = await page.$('#real-delete');
    await confirmDelete.click();

    await page.waitForNavigation();
    expect(page.url()).toBe(`${baseUrl}home.html`);
    
    const termCards = await page.$$('term-card');
    expect(termCards.length).toBe(0);
  });
});
