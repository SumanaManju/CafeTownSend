import { browser, element, by } from 'protractor';
import { When } from 'cucumber';
import { BaseStepDefinitions } from '../base/steps/base.steps';
import { UpdatePageObjects } from './cts-update.po';
const updateDataSets = require('./cts-update.data.json');
const pageName = 'Update';

export class UpdateStepDefinitions extends UpdatePageObjects implements BaseStepDefinitions {

  constructor() {
    super();
    this.stepDefinitions();
  }

  stepDefinitions() {
    this.addCommonSteps(this.pageObjects, pageName, updateDataSets);

    When(new RegExp(`^${pageName}: I doubleclick on "([^"]*)"$`), (elementKey, callback) => {
      browser.actions().doubleClick(element(by.repeater('employee in employees'))).perform();
      callback();
    });

    When(new RegExp(`^${pageName}: I click on "([^"]*)" and wait for ok$`), (elementKey, callback) => {
      element(by.cssContainingText('.main-button', 'Update')).click();
      browser.switchTo().alert().accept();
      callback();
    });

    When(new RegExp(`^${pageName}: I click on "([^"]*)" have "([^"]*)"$`),
      (elementKey, context, callback) => {
        browser.sleep(2000);
        browser.actions().doubleClick(this.pageObjects[updateDataSets[elementKey]]).perform();
        callback();
      });
  }
}

export const updateStepDefinitions = new UpdateStepDefinitions();
