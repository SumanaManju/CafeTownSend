import { by, element, browser } from 'protractor';
import { CommonPageObjects } from '../base/page-objects/common.po';
import { CommonStepDefinitions } from '../base/steps/common.steps';
import { BasePageObjects } from '../base/page-objects/base.po';


export class UserRolesPageObjects extends CommonStepDefinitions implements BasePageObjects {
  pageObjects = {
    addItemButton: element.all(by.xpath('//a[@title="Add Item"]')),
    newUserName: element(by.id('username')),
    next: element(by.id('submitInputImmNameId')),
    newPassword: element(by.id('inputPassName')),
    newLoginButton: element(by.id('submitInputAutId')),
    searchPage: element(by.css('.cms-search-panel')),
    logout: element(by.className('ct-header__button')),
    loginPage: element(by.id('container')),
    searchButton: element(by.xpath('//a[@title="Search"]')),
    editButton: element(by.css('.edit-icon a')),
    edit: element(by.css('.cms-edit-form-panel')),
    tryOut: element(by.id('mfaPopupBtnTry')),
    moderatorDropdown: element(by.name('moderators')),
    moderator: (text: string) => element(by.cssContainingText('.mat-option-text', text))
  };
}

export const userRolesPageObjects = new UserRolesPageObjects();
