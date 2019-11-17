import {browser, protractor} from 'protractor';
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

    When(new RegExp(`^${pageName}: Switch to alert popup$`), (callback) => {
      browser.wait(protractor.ExpectedConditions.alertIsPresent(), 5000);
      browser.switchTo().alert().accept();
      callback();
    });
  }
}

export const deleteStepDefinitions = new DeleteStepDefinitions();
