import {browser, ExpectedConditions as EC} from 'protractor';
import { When } from 'cucumber';
import { BaseStepDefinitions } from '../base/steps/base.steps';
import { SearchPageObjects } from './cts-search.po';
const searchDataSets = require('./cts-search.data.json');
const pageName = 'Search';

export class SearchStepDefinitions extends SearchPageObjects implements BaseStepDefinitions {

  constructor() {
    super();
    this.stepDefinitions();
  }

  stepDefinitions() {
    this.addCommonSteps(this.pageObjects, pageName, searchDataSets);

    When(new RegExp(`^${pageName}: I click on "([^"]*)" have "([^"]*)"$`),
      (elementKey, context, callback) => {
        browser.wait(EC.presenceOf(this.pageObjects[searchDataSets[elementKey]]));
        browser.driver.wait(EC.elementToBeClickable(this.pageObjects[searchDataSets[elementKey]]));
        browser.actions().doubleClick(this.pageObjects[searchDataSets[elementKey]]).perform();
        browser.sleep(3000);
        callback();
      });
  }
}

export const searchStepDefinitions = new SearchStepDefinitions();
