import { browser, ExpectedConditions as EC } from 'protractor';
import { Given, When, Then } from 'cucumber';
import { expect } from '../../support/chai-imports';

import { BaseStepDefinitions } from '../base/steps/base.steps';
import { LogoutPageObjects } from './logout.po';

const logoutDataSets = require('./logout.data.json');
const pageName = 'Logout';

export class LoginStepDefinitions extends LogoutPageObjects implements BaseStepDefinitions {

  constructor() {
    super();
    this.stepDefinitions();
  }

  stepDefinitions() {
    this.addCommonSteps(this.pageObjects, pageName, logoutDataSets);
  }
}

export const loginStepDefinitions = new LoginStepDefinitions();
