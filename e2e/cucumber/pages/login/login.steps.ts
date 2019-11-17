import { When } from 'cucumber';
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

    When(new RegExp(`^${pageName}: Check "([^"]*)" message$`),
      (elementKey, callback) => {
        // tslint:disable-next-line:only-arrow-functions
        (this.pageObjects[loginDataSets[elementKey]]).getText().then(function(text) {
          expect(text).to.equal('Hello Luke');
        });
        callback();
      });
  }
}

export const loginStepDefinitions = new LoginStepDefinitions();
