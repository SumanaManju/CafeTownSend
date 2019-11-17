import { by, element, browser } from 'protractor';
import { CommonPageObjects } from '../base/page-objects/common.po';
import { CommonStepDefinitions } from '../base/steps/common.steps';
import { BasePageObjects } from '../base/page-objects/base.po';

export class CmsDeletePageObjects extends CommonStepDefinitions implements BasePageObjects {
  pageObjects = {
    myChecklistItem: (text: string = 'E2E update header') => element.all(
      by.cssContainingText('.cmsitems-list__expanded-row', text)
    ).first(),
    deleteConfirmationModal: element.all(by.css('.mat-dialog-container')),
    deleteConfirm: element(by.css('.mat-dialog-container')).element(by.cssContainingText('.mat-raised-button', 'Yes')),
  };
}

export const cmsDeletePageObjects = new CmsDeletePageObjects();
