import { BaseStepDefinitions } from '../base/steps/base.steps';
import { LogoutPageObjects } from './logout.po';
const logoutDataSets = require('./logout.data.json');
const pageName = 'Logout';

export class LogoutStepDefinitions extends LogoutPageObjects implements BaseStepDefinitions {

  constructor() {
    super();
    this.stepDefinitions();
  }

  stepDefinitions() {
    this.addCommonSteps(this.pageObjects, pageName, logoutDataSets);
  }
}

export const logoutStepDefinitions = new LogoutStepDefinitions();
