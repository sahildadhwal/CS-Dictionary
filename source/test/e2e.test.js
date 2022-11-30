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

    /*
    const termName = await page.$('#term_name');
    const termTags = await page.$('#tags');
    const termShortDescription = await page.$('#short_description');
    */
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

  it('Make a test for the checkpoint video', async () => {
    expect(2+2).toBe(4); 
  });
});
