import { by, element, browser } from 'protractor';
import { CommonPageObjects } from '../base/page-objects/common.po';
import { CommonStepDefinitions } from '../base/steps/common.steps';
import { BasePageObjects } from '../base/page-objects/base.po';

export class LogoutPageObjects extends CommonStepDefinitions implements BasePageObjects {
  pageObjects = {
    logout: element(by.cssContainingText('.main-button', 'Logout')),
    loginPage: element(by.id('container'))
  };
}

export const logoutPageObjects = new LogoutPageObjects();
