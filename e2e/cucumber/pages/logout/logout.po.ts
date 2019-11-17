import { by, element } from 'protractor';
import { CommonStepDefinitions } from '../base/steps/common.steps';
import { BasePageObjects } from '../base/page-objects/base.po';

export class LogoutPageObjects extends CommonStepDefinitions implements BasePageObjects {
  pageObjects = {
    logout: element(by.cssContainingText('.main-button', 'Logout')),
    mainViewEmployee: element(by.css('.main-view.main-view-employees'))

  };
}

export const logoutPageObjects = new LogoutPageObjects();
