import { by, element } from 'protractor';
import { CommonStepDefinitions } from '../base/steps/common.steps';
import { BasePageObjects } from '../base/page-objects/base.po';

export class CreatePageObjects extends CommonStepDefinitions implements BasePageObjects {

  pageObjects = {
    createPage: element(by.css('.main-view-create')),
    createButton: element(by.id('bAdd')),
    firstName: element(by.model('selectedEmployee.firstName')),
    lastName: element(by.model('selectedEmployee.lastName')),
    startDate: element(by.model('selectedEmployee.startDate')),
    email: element(by.model('selectedEmployee.email')),
    addButton: element(by.cssContainingText('.main-button', 'Add')),
    mainViewEmployee: element(by.css('.main-view.main-view-employees'))
  };
}

export const createPageObjects = new CreatePageObjects();
