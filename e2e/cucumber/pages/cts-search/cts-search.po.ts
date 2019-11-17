import { by, element } from 'protractor';
import { CommonStepDefinitions } from '../base/steps/common.steps';
import { BasePageObjects } from '../base/page-objects/base.po';

export class SearchPageObjects extends CommonStepDefinitions implements BasePageObjects {
  pageObjects = {
    backButton: element(by.css('.subButton.bBack')),
    viewPage: element(by.css('.main-view-employees')),
    checklist: element(by.repeater('employee in employees'))
      .element(by.xpath('//li[contains(text(), "Sumana Manju")]'))
  };
}

export const searchPageObjects = new SearchPageObjects();
