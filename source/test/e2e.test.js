/// <reference types="jest" />
const { Browser } = require('puppeteer');

describe('Basic user flow for Website', () => {
  // Visit Project Website
  beforeAll(async () => {
    await page.goto('https://cs-dictionary.netlify.app/');
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
    expect(page.url()).toBe('https://cs-dictionary.netlify.app/create-term.html');
  });
   
  it('Add a new term', async () => {
    await page.goto('https://cs-dictionary.netlify.app/create-term.html');

    await page.type('#term_name', 'Apple');
    await page.type('#tags', 'fruit, crisp');
    await page.type('#short_description', 'fruit, crisp');
    const button2 = await page.$('#create_button');
    await button2.click();
    await page.waitForNavigation();

    expect(page.url()).toBe('https://cs-dictionary.netlify.app/home.html');
    const recentlyAdded = await page.$$('.recently-added-elements>*');     
    expect(recentlyAdded.length).toBe(1);
  });

  it('Check term is displayed in recently added', async () => {
    await page.goto('https://cs-dictionary.netlify.app/');

    const termCards = await page.$$('.recently-added-elements>term-card');
    expect(termCards.length).toBe(1);                            //only one card in recents

    const termNameEl = await page.evaluateHandle(`document.querySelector("body > main > div.recently-added > div > term-card").shadowRoot.querySelector("#term-name")`);
    let termName = await page.evaluate(el => el.textContent, termNameEl)
    expect(termName).toBe('Apple');

    const descriptionEl = await page.evaluateHandle(`document.querySelector("body > main > div.recently-added > div > term-card").shadowRoot.querySelector("#description")`);
    let description = await page.evaluate(el => el.textContent, descriptionEl)
    expect(description).toBe('\n        fruit, crisp\n      ');  //newline, 8 spaces, newline, 6 spaces... why
  });

  it('Check popular tags are working', async () => {
    const termCards = await page.$$('term-card');
    console.log(termCards);
    expect(termCards.length).toBe(11);                           //1 in recents, 2 tags * 5 each, total 11
    const termNames = await page.evaluateHandle(`document.querySelectorAll("term-card").shadowRoot.querySelector("#term-name")`);
    let termName0 = await page.evaluate(el => el.textContent, termNames[0]);
    let termName1 = await page.evaluate(el => el.textContent, termNames[1]);
    console.log(`${termName0}, ${termName1}`);
  });
});
