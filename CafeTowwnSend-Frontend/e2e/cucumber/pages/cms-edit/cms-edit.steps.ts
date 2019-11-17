import { browser, element, by, ExpectedConditions as EC } from 'protractor';
import { Given, When, Then } from 'cucumber';
import { expect } from '../../support/chai-imports';

import { BaseStepDefinitions } from '../base/steps/base.steps';
import { CmsEditPageObjects } from './cms-edit.po';

const cmsEdithDataSets = require('./cms-edit.data.json');
const pageName = 'Edit';

export class CmsEditStepDefinitions extends CmsEditPageObjects implements BaseStepDefinitions {

  constructor() {
    super();
    this.stepDefinitions();
  }

  stepDefinitions() {
    this.addCommonSteps(this.pageObjects, pageName, cmsEdithDataSets);

    When(new RegExp(`^${pageName}: I edit "([^"]*)" have "([^"]*)"$`),
      (elementKey, content, callback) => {
        browser.driver.wait(EC.presenceOf(this.pageObjects[cmsEdithDataSets[elementKey]](content)));
        const editButton = this.pageObjects[cmsEdithDataSets[elementKey]](content)
          .element(by.xpath('..'))
          .element(by.css('.edit-icon a'));
        browser.wait(EC.elementToBeClickable(editButton));
        expect(editButton.click()).and.notify(callback);
    });

    When(new RegExp(`^${pageName}: I click on "([^"]*)" and wait for "([^"]*)" element to be removed$`),
    (elementKey, elementKey2, callback) => {
      browser.wait(EC.presenceOf(this.pageObjects[cmsEdithDataSets[elementKey2]]));
      browser.wait(
        EC.elementToBeClickable(this.pageObjects[cmsEdithDataSets[elementKey2]].element(by.xpath(`//a[@title="${elementKey}"]`)))
      );
      expect(this.pageObjects[cmsEdithDataSets[elementKey2]].element(by.xpath(`//a[@title="${elementKey}"]`)).click());
      expect(this.pageObjects[cmsEdithDataSets[elementKey2]].isPresent()).to.eventually.false.and.notify(callback);
    });

    When(new RegExp(`^${pageName}: I search "([^"]*)" have "([^"]*)"$`), (elementKey, content, callback) => {
      browser.driver.wait(EC.presenceOf(this.pageObjects[cmsEdithDataSets[elementKey]](content)));
      expect(this.pageObjects[cmsEdithDataSets[elementKey]](content).getText())
      .to.eventually.equals(content)
      .and.notify(callback);
    });
  }
}

export const cmsEditStepDefinitions = new CmsEditStepDefinitions();
