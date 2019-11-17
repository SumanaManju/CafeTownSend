import {browser, by, element, protractor} from 'protractor';
import { When } from 'cucumber';
import { BaseStepDefinitions } from '../base/steps/base.steps';
import {DeletePageObjects} from './cts-delete.po';
const deleteDataSets = require('./cts-delete.data.json');
const pageName = 'Delete';

export class DeleteStepDefinitions extends DeletePageObjects implements BaseStepDefinitions {

  constructor() {
    super();
    this.stepDefinitions();
  }

  stepDefinitions() {

    this.addCommonSteps(this.pageObjects, pageName, deleteDataSets);

    When(new RegExp(`^${pageName}: I doubleclick on "([^"]*)"$`), (elementKey, callback) => {
      browser.actions().doubleClick(element(by.repeater('employee in employees'))).perform();
      callback();
    });


    When(new RegExp(`^${pageName}: I switch to alert$`), (callback) => {
      // element(by.cssContainingText('.main-button', 'Delete')).click();
      browser.ignoreSynchronization = true
      browser.wait(protractor.ExpectedConditions.alertIsPresent(), 5000);
     // browser.sleep(5000);
      const ale = browser.switchTo().alert();
      ale.accept();
      callback();
    });

    When(new RegExp(`^${pageName}: I click on "([^"]*)" have "([^"]*)"$`),
      (elementKey, context, callback) => {
        browser.sleep(2000);
        browser.actions().doubleClick(this.pageObjects[deleteDataSets[elementKey]]).perform();
        callback();
      });
  }
}

export const deleteStepDefinitions = new DeleteStepDefinitions();
