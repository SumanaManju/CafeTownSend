import { by, element, browser } from 'protractor';
import { CommonPageObjects } from '../base/page-objects/common.po';
import { CommonStepDefinitions } from '../base/steps/common.steps';
import { BasePageObjects } from '../base/page-objects/base.po';


export class LoginPageObjects extends CommonStepDefinitions implements BasePageObjects {
  pageObjects = {

    username: element(by.model('user.name')),
    password: element(by.model('user.password')),
    loginButton: element(by.className('main-button'))

  };
}

export const loginPageObjects = new LoginPageObjects();
