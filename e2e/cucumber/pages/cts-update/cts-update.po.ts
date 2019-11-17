import { by, element } from 'protractor';
import { CommonStepDefinitions } from '../base/steps/common.steps';
import { BasePageObjects } from '../base/page-objects/base.po';

export class UpdatePageObjects extends CommonStepDefinitions implements BasePageObjects {
  pageObjects = {
    updateButton: element(by.cssContainingText('.main-button', 'Update')),
    viewPage: element(by.css('.main-view-employees')),
    firstName: element(by.model('selectedEmployee.firstName')),
    checklist: element(by.repeater('employee in employees'))
      .element(by.xpath('//li[contains(text(), "Sumana Manju")]'))
  };
}

export const updatePageObjects = new UpdatePageObjects();
