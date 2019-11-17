import { BaseStepDefinitions } from '../base/steps/base.steps';
import { CreatePageObjects } from './cts-create.po';
const createDataSets = require('./cts-create.data.json');
const PageName = 'Create';

export class CreateStepDefinitions extends CreatePageObjects implements BaseStepDefinitions {

  constructor() {
    super();
    this.stepDefinitions();
  }

  stepDefinitions() {
    this.addCommonSteps(this.pageObjects, PageName, createDataSets);
 }
}

export const createStepDefinitions = new CreateStepDefinitions();
