import { browser, element, by, ExpectedConditions as EC } from 'protractor';
import { Given, When, Then } from 'cucumber';
import { expect } from '../../support/chai-imports';

import { BaseStepDefinitions } from '../base/steps/base.steps';
import { CmsDeletePageObjects } from './cms-delete.po';

const cmsDeleteDataSets = require('./cms-delete.data.json');
const pageName = 'Delete';

export class CmsDeleteStepDefinitions extends CmsDeletePageObjects implements BaseStepDefinitions {

  constructor() {
    super();
    this.stepDefinitions();
  }

  stepDefinitions() {
    this.addCommonSteps(this.pageObjects, pageName, cmsDeleteDataSets);

    When(new RegExp(`^${pageName}: I delete "([^"]*)" have "([^"]*)"$`),
      (elementKey, content, callback) => {
        browser.driver.wait(EC.presenceOf(this.pageObjects[cmsDeleteDataSets[elementKey]](content)));
        const deleteButton = this.pageObjects[cmsDeleteDataSets[elementKey]](content)
          .element(by.xpath('..'))
          .element(by.css('.delete-icon a'));
        browser.wait(EC.elementToBeClickable(deleteButton));
        expect(deleteButton.click()).and.notify(callback);
    });

    When(new RegExp(`^${pageName}: I click on "([^"]*)" and wait for "([^"]*)" element to be removed$`),
    (elementKey, elementKey2, callback) => {
      browser.wait(EC.presenceOf(this.pageObjects[cmsDeleteDataSets[elementKey2]]()));
      browser.wait(
        EC.elementToBeClickable(this.pageObjects[cmsDeleteDataSets[elementKey]])
      );
      expect(this.pageObjects[cmsDeleteDataSets[elementKey]].click()).and.notify(callback);
    });
  }
}

export const cmsDeleteStepDefinitions = new CmsDeleteStepDefinitions();
