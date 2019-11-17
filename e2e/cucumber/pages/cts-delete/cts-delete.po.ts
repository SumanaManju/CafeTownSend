import { by, element } from 'protractor';
import { CommonStepDefinitions } from '../base/steps/common.steps';
import { BasePageObjects } from '../base/page-objects/base.po';

export class DeletePageObjects extends CommonStepDefinitions implements BasePageObjects {

  pageObjects = {
    deleteButton: element(by.cssContainingText('.main-button', 'Delete')),
    viewPage: element(by.css('.main-view-employees')),
    checklist: element(by.repeater('employee in employees'))
      .element(by.xpath('//li[contains(text(), "Pichu Manju")]'))
  };
}

export const deletePageObjects = new DeletePageObjects();
