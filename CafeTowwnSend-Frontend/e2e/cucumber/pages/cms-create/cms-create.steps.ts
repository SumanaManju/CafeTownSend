import { browser, ExpectedConditions as EC } from 'protractor';
import { Given, When, Then } from 'cucumber';
import { expect } from '../../support/chai-imports';

import { BaseStepDefinitions } from '../base/steps/base.steps';
import { CreatePageObjects } from './cms-create.po';

const createDataSets = require('./cms-create.data.json');
const PageName = 'Create';

export class CreateStepDefinitions extends CreatePageObjects implements BaseStepDefinitions {

  constructor() {
    super();
    this.stepDefinitions();
  }

  stepDefinitions() {

    this.addCommonSteps(this.pageObjects, PageName, createDataSets);

    When(new RegExp(`^${PageName}: I search "([^"]*)" have "([^"]*)"$`), (elementKey, content, callback) => {
      browser.driver.wait(EC.presenceOf(this.pageObjects[createDataSets[elementKey]](content)));
      expect(this.pageObjects[createDataSets[elementKey]](content).getText())
      .to.eventually.equals(content)
      .and.notify(callback);
    });
  }
}

export const createStepDefinitions = new CreateStepDefinitions();
