import { by, element } from 'protractor';
import { CommonStepDefinitions } from '../base/steps/common.steps';
import { BasePageObjects } from '../base/page-objects/base.po';


export class LoginPageObjects extends CommonStepDefinitions implements BasePageObjects {
  pageObjects = {
    username: element(by.model('user.name')),
    password: element(by.model('user.password')),
    loginButton: element(by.buttonText('Login')),
    greeting: element(by.id('greetings'))
  };
}

export const loginPageObjects = new LoginPageObjects();
