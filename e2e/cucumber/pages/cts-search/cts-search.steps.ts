import { BaseStepDefinitions } from '../base/steps/base.steps';
import { SearchPageObjects } from './cts-search.po';
const searchDataSets = require('./cts-search.data.json');
const pageName = 'Search';

export class SearchStepDefinitions extends SearchPageObjects implements BaseStepDefinitions {

  constructor() {
    super();
    this.stepDefinitions();
  }

  stepDefinitions() {
    this.addCommonSteps(this.pageObjects, pageName, searchDataSets);
 }
}

export const searchStepDefinitions = new SearchStepDefinitions();
