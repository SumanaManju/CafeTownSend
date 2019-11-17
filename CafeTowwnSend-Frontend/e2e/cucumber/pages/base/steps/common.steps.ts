import {browser, ExpectedConditions as EC, element, by} from 'protractor';
import { BaseStepDefinitions } from './base.steps';
import { CommonPageObjects } from '../page-objects/common.po';
import { expect, assert, should } from '../../../support/chai-imports';
import { Given, When, Then } from 'cucumber';
import * as helpers from '../../../config/helpers';

const testData = helpers.helpers.getE2ETestData();

export const scrollIntoView = function (element) {
  arguments[0].scrollIntoView(false);
};

export class CommonStepDefinitions extends CommonPageObjects implements BaseStepDefinitions {

  stepDefinitions() { }

  /**
   * Helper Method - To retrive common setps based on PageName and pageObjects
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
      expect(pageObjects[dataSet[elementKey]].isPresent()).to.eventually.true.and.notify(callback);
    });

    /**
     * Scenario steps on not seeing a target element
     * e.g. Login: I don't see "*"
     */
    Then(new RegExp(`^${PageName}: I don't see "([^"]*)"$`), (elementKey, callback) => {
      browser.driver.wait(EC.stalenessOf(pageObjects[dataSet[elementKey]]));
      expect(pageObjects[dataSet[elementKey]].count())
        .to.eventually.equal(0)
        .and.notify(callback);
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
     * Scenario steps on user action - fill something in Textarea
     * e.g. Login: I fill in "<TextArea>" in ckeditor "TextAreaField"
     */
    Then(new RegExp(`^${PageName}: I fill in "([^"]*)" in ckeditor "([^"]*)"$`), (value, elementKey, callback) => {
      browser.executeScript(scrollIntoView, pageObjects[dataSet[elementKey]]);
      pageObjects[dataSet[elementKey]].element(by.tagName('textarea')).getAttribute('name').then(name => {
        browser.executeScript(`window.CKEDITOR.instances['${name}'].setData('${value}')`);
        callback();
      });
    });

    /**
     * Scenario steps when user action - select something from somewhere
     * e.g. Search: I select "<DepartureStation>" value in "Departure station"
     */
    When(new RegExp(`^${PageName}: I select "([^"]*)" value in "([^"]*)"$`), (value, elementKey, callback) => {
      let itemInList;
      if (PageName === 'Search') {
        itemInList = pageObjects[dataSet[elementKey]](testData[PageName][elementKey]);
      } else {
        itemInList = pageObjects[dataSet[elementKey]](value);
      }
      browser.driver.wait(EC.elementToBeClickable(itemInList));
      browser.executeScript(scrollIntoView, itemInList);
      expect(itemInList.click()).and.notify(callback);
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
     * Scenario steps when an element to have some text [wild card]
     * e.g. Home: I see "1" "checklist item"
     */
    When(new RegExp(`^${PageName}: I see "([^"]*)" "([^"]*)"$`), (count, elementKey, callback) => {
      browser.driver.wait(EC.presenceOf(pageObjects[dataSet[elementKey]]));
      expect(pageObjects[dataSet[elementKey]].count())
        .to.eventually.equal(parseInt(count, 10))
        .and.notify(callback);
    });

    /**
     * Scenario steps on when element to `have` some text
     * e.g. Home: I see "that the page logo" have "CMS"
     */
    When(new RegExp(`^${PageName}: I see "([^"]*)" have "([^"]*)"$`), (elementKey, content, callback) => {
      browser.driver.wait(EC.presenceOf(pageObjects[dataSet[elementKey]]));
      expect(pageObjects[dataSet[elementKey]].getText().then(text => text.toLowerCase()))
        .to.eventually.equals(content.trim().toLowerCase())
        .and.notify(callback);
    });

    /**
     * Scenario steps when an element to `contain` some text
     * e.g. Home: I see "that the page logo" contain "CMS"
     */
    When(new RegExp(`^${PageName}: I see "([^"]*)" contain "([^"]*)"$`), (elementKey, content, callback) => {
      browser.driver.wait(EC.presenceOf(pageObjects[dataSet[elementKey]]));
      expect(pageObjects[dataSet[elementKey]].getText().then(text => text.toLowerCase()))
        .to.eventually.contains(content.trim().toLowerCase())
        .and.notify(callback);
    });

    /**
     * Scenario steps on current url contains some text
     * e.g. Home: Current url contains "cms-edit"
     */
    Then(new RegExp(`^${PageName}: Current url contains "([^"]*)"$`), (url, callback) => {
      expect(browser.driver.getCurrentUrl())
        .to.eventually.contain(url)
        .and.notify(callback);
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
     * Scenario steps on wait for (x) seconds of loading
     * e.g. Home: I wait for "5" seconds of loading
     */
    Then(new RegExp(`^${PageName}: I wait for "([^"]*)" seconds of loading$`), { timeout: this.timeout },
    (seconds, callback) => {
      const check = pageObjects.getLoading;
      check.isPresent().then(function (condition) {
        if (condition === true) {
          browser.driver.sleep(Number(seconds) * 1000);
          callback();
        } else {
          callback();
        }
      });
    });

    /**
     * Scenario steps on wait for loading completion
     * e.g. Home: I wait for loading completion
     */
    Then(new RegExp(`^${PageName}: I wait for loading completion$`), { timeout: this.timeout }, (callback) => {
      browser.driver.wait(EC.stalenessOf(this.loadingElement()), this.timeout);
      expect(this.loadingPage().count()).to.eventually.equal(0).and.notify(callback);
    });

    /**
     * Scenario steps on wait for loading completion
     * e.g. Home: I wait for custom script "addChecklist"
     */
    When(new RegExp(`^${PageName}: I wait for custom script "([^"]*)"$`), (customMethodName, callback) => {
      expect(browser.driver.wait(pageObjects[customMethodName]))
        .to.be.ok
        .and.notify(callback);
    });

    /**
     * Scenario steps on see a target button is enabled
     * e.g. Home: I see "check list create" button is enabled
     */
    Then(new RegExp(`^${PageName}: I see "([^"]*)" button is enabled$`), (elementKey, callback) => {
      browser.driver.wait(() => {
        browser.wait(EC.presenceOf(pageObjects[dataSet[elementKey]]));
        expect(pageObjects[dataSet[elementKey]].isEnabled())
          .to.eventually.true
          .and.notify(callback);
      });
    });

    /**
     * Scenario steps on see a target button is disabled
     * e.g. Home: I see "check list create" button is disabled
     */
    Then(new RegExp(`^${PageName}: I see "([^"]*)" button is disabled$`), (elementKey, callback) => {
      browser.driver.wait(() => {
        browser.wait(EC.presenceOf(pageObjects[dataSet[elementKey]]));
        expect(pageObjects[dataSet[elementKey]].isEnabled())
          .to.eventually.false
          .and.notify(callback);
      });
    });

    /**
     * Scenario steps when select a target element
     * e.g. Search: I select "Aircraft type"
     */
    When(new RegExp(`^${PageName}: I select "([^"]*)"$`), { timeout: this.timeout }, (elementKey, callback) => {
      browser.driver.wait(EC.elementToBeClickable(pageObjects[dataSet[elementKey]]));
      browser.executeScript(scrollIntoView, pageObjects[dataSet[elementKey]]);
      browser.driver.sleep(400);
      expect(pageObjects[dataSet[elementKey]].click()).and.notify(callback);
    });

    /**
     * Scenario steps when select a value from a target element
     * e.g. Search: I select "B789" element in "Aircraft type"
     */
    When(new RegExp(`^${PageName}: I select "([^"]*)" element in "([^"]*)"$`), (index, elementKey, callback) => {
      const itemInList = pageObjects[elementKey].get(Number(index) - 1);
      browser.driver.wait(EC.elementToBeClickable(itemInList));
      browser.executeScript(scrollIntoView, itemInList);
      browser.driver.sleep(400);
      expect(itemInList.click()).and.notify(callback);
    });

    /**
     * Scenario steps when click on an element and wait for another element to be appear
     * e.g. Search: I click on "Add Item" and wait for "cms edit form panel" element to be appear
     */
    When(new RegExp(`^${PageName}: I click on "([^"]*)" and wait for "([^"]*)" element to be appear$`),
    (elementKey, elementKey2, callback) => {
      browser.wait(EC.elementToBeClickable(pageObjects[dataSet[elementKey]]));
      browser.executeScript(scrollIntoView, pageObjects[dataSet[elementKey]]);
      expect(pageObjects[dataSet[elementKey]].click());
      browser.wait(EC.presenceOf(pageObjects[dataSet[elementKey2]]));
      expect(pageObjects[dataSet[elementKey2]].isPresent()).to.eventually.true.and.notify(callback);
    });

    Then(new RegExp(`^${PageName}: I close "([^"]*)"$`), (elementKey, callback) => {
      browser.wait(EC.presenceOf(pageObjects[elementKey]));
      browser.wait(EC.elementToBeClickable(pageObjects[dataSet[elementKey]]));
      browser.executeScript(scrollIntoView, pageObjects[dataSet[elementKey]]);
      expect(pageObjects[dataSet[elementKey]].click()).and.notify(callback);
    });

    /**
     * Scenario steps when an element shows on the page
     * e.g. Search: I wait for "cms edit form panel" element on the page
     */
    When(new RegExp(`^${PageName}: I wait for "([^"]*)" element on the page$`), (elementKey, callback) => {
      browser.wait(EC.presenceOf(pageObjects[elementKey]));
      expect(pageObjects[elementKey].isEnabled())
        .to.eventually.true
        .and.notify(callback);
    });

    /**
     * Scenario steps when check condition for an element to be appear and then click
     * e.g. Search: I check condition for element "Aircraft type" to be appear and then click
     */
    When(new RegExp(`^${PageName}: I check condition for element "([^"]*)" to be appear and then click$`),
    (elementKey, callback) => {
      const check = (pageObjects[dataSet[elementKey]]);
      check.isPresent().then(function (condition) {
        if (condition === true) {
          expect(pageObjects[dataSet[elementKey]].click())
            .and.notify(callback);
        } else {
          callback();
        }
      });
    });
  }
}

export const commonStepDefinitions = new CommonStepDefinitions();
