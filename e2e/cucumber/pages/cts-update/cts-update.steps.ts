import { BaseStepDefinitions } from '../base/steps/base.steps';
import { UpdatePageObjects } from './cts-update.po';
const updateDataSets = require('./cts-update.data.json');
const pageName = 'Update';

export class UpdateStepDefinitions extends UpdatePageObjects implements BaseStepDefinitions {

  constructor() {
    super();
    this.stepDefinitions();
  }

  stepDefinitions() {
    this.addCommonSteps(this.pageObjects, pageName, updateDataSets);
 }
}

export const updateStepDefinitions = new UpdateStepDefinitions();
