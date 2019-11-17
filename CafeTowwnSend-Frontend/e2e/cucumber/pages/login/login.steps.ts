import { browser, ExpectedConditions as EC } from 'protractor';
import { Given, When, Then } from 'cucumber';
import { expect } from '../../support/chai-imports';

import { BaseStepDefinitions } from '../base/steps/base.steps';
import { LoginPageObjects } from './login.po';

const loginDataSets = require('./login.data.json');
const pageName = 'Login';

export class LoginStepDefinitions extends LoginPageObjects implements BaseStepDefinitions {

  constructor() {
    super();
    this.stepDefinitions();
  }

  stepDefinitions() {
    this.addCommonSteps(this.pageObjects, pageName, loginDataSets);
  }
}

export const loginStepDefinitions = new LoginStepDefinitions();
