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
 
  /* 
  it('Add a new term', async () => {
    console.log('Adding the term Apple');
    const button = await page.$('.add-button');
    await page.waitForNavigation();
    await button.click();
    const pageTarget = this._page.target(); //save this to know that this was the opener
    await button.click(); //click on a link
    //check that you opened this page, rather than just checking the url
    const newTarget = await this._browser.waitForTarget(target => 
    target.opener() === pageTarget); 
    const newPage = await newTarget.page(); //get the page object
    await newPage.waitForSelector('body'); //wait for page to be loaded
    const term = await page.$('text-box');
    const termName = await term.$('term-name');
    const termTags = await term.$('tags');
    const termShortDescription = await term.$('short_description');
    await termName.setProperty('innerText','Apple');
    await termTags.setProperty('innerText','fruit, crisp');
    await termShortDescription.setProperty('innerText','A red circular fruit that grows on trees.');
    const button2 = await term.$('create-button');
    button2.click();
    const numRecentlyAdded = await page.$$eval('recently-added-elements', (items) => {
      return items.length;
    });
    expect(numRecentlyAdded).toBe(1);
  });
  */
});
