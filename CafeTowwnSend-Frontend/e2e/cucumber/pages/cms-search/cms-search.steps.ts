import { browser, element, by, ExpectedConditions as EC } from 'protractor';
import { Given, When, Then } from 'cucumber';
import { expect } from '../../support/chai-imports';

import { BaseStepDefinitions } from '../base/steps/base.steps';
import { CmsSearchPageObjects } from './cms-search.po';

const cmsSearchDataSets = require('./cms-search.data.json');
const pageName = 'Search';

export class CmsSearchStepDefinitions extends CmsSearchPageObjects implements BaseStepDefinitions {

  constructor() {
    super();
    this.stepDefinitions();
  }

  stepDefinitions() {
    this.addCommonSteps(this.pageObjects, pageName, cmsSearchDataSets);

    When(new RegExp(`^${pageName}: I search "([^"]*)" have "([^"]*)"$`), (elementKey, content, callback) => {
      browser.driver.wait(EC.presenceOf(this.pageObjects[cmsSearchDataSets[elementKey]](content)));
      expect(this.pageObjects[cmsSearchDataSets[elementKey]](content).getText())
        .to.eventually.equals(content)
        .and.notify(callback);
    });
  }
}

export const cmsSearchStepDefinitions = new CmsSearchStepDefinitions();
