import {browser, ExpectedConditions as EC } from 'protractor';
import { BaseStepDefinitions } from './base.steps';
import { CommonPageObjects } from '../page-objects/common.po';
import { expect } from '../../../support/chai-imports';
import { Given, When, Then } from 'cucumber';
import * as helpers from '../../../config/helpers';
const testData = helpers.helpers.getE2ETestData();

// tslint:disable-next-line:only-arrow-functions no-shadowed-variable
export const scrollIntoView = function(element) {
  arguments[0].scrollIntoView(false);
};

export class CommonStepDefinitions extends CommonPageObjects implements BaseStepDefinitions {

  stepDefinitions() { }

  /**
   * Helper Method - To retrieve common setups based on PageName and pageObjects
   * @param pageObjects Page objects
   * @param PageName Page name
   * @param dataSet Data set
   */
  addCommonSteps(pageObjects, PageName: string, dataSet) {

    /**
     * Redirect on url
     * e.g. Login: I am on the "/"
     */
    Given(new RegExp(`^${PageName}: I am on the "([^"]*)"$`), { timeout: this.timeout }, (url: string, callback) => {
      this.go(url).then(callback);
    });

    /**
     * Scenario steps on the target page
     * e.g. Login: I am on the "Home" page
     */
    Given(new RegExp(`^${PageName}: I am on the "([^"]*)" page$`), { timeout: this.timeout }, (elementKey, callback) => {
      browser.driver.wait(EC.presenceOf(pageObjects[dataSet[elementKey]]));
      console.log('success');
      expect(pageObjects[dataSet[elementKey]].isPresent()).to.eventually.true.and.notify(callback);
    });

    /**
     * Scenario steps on user action - fill something in somewhere
     * e.g. Login: I fill "<userId>" in "username"
     */
    Then(new RegExp(`^${PageName}: I fill "([^"]*)" in "([^"]*)"$`), (value, elementKey, callback) => {
      pageObjects[dataSet[elementKey]].clear().sendKeys(value);
      callback();
    });

    /**
     * Scenario steps when user action - click on something
     * e.g. Login: I click on "login button"
     */
    When(new RegExp(`^${PageName}: I click on "([^"]*)"$`), { timeout: this.timeout }, (elementKey, callback) => {
      browser.wait(EC.elementToBeClickable(pageObjects[dataSet[elementKey]]));
      browser.executeScript(scrollIntoView, pageObjects[dataSet[elementKey]]);
      expect(pageObjects[dataSet[elementKey]].click()).and.notify(callback);
    });

    /**
     * Scenario steps on wait for (x) seconds
     * e.g. Home: I wait for "5" seconds
     */
    Then(new RegExp(`^${PageName}: I wait for "([^"]*)" seconds$`), (seconds, callback) => {
      // browser.driver.sleep(Number(seconds) * 1000);
      setTimeout(() => {
        callback();
      }, Number(seconds) * 1000);
    });

    /**
     * Scenario steps on check the element is present and click
     * e.g. Home: I click on "headline" have "<title>"
     */

    When(new RegExp(`^${PageName}: I click on "([^"]*)" have "([^"]*)"$`),
      (elementKey, context, callback) => {
        browser.wait(EC.presenceOf(this.pageObjects[dataSet[elementKey]]));
        browser.driver.wait(EC.elementToBeClickable(this.pageObjects[dataSet[elementKey]]));
        browser.actions().doubleClick(this.pageObjects[dataSet[elementKey]]).perform();
        callback();
      });

  }
}

export const commonStepDefinitions = new CommonStepDefinitions();
