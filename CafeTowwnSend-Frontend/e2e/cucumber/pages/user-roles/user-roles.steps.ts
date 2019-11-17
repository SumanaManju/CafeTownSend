import {browser, ExpectedConditions as EC, element, by} from 'protractor';
import { Given, When, Then } from 'cucumber';
import {assert, expect} from '../../support/chai-imports';

import { BaseStepDefinitions } from '../base/steps/base.steps';
import { UserRolesPageObjects } from './user-roles.po';
import {scrollIntoView} from "../base/steps/common.steps";
import {count} from "rxjs/operators";

const userRolesDataSets = require('./user-roles.data.json');
const pageName = 'User Roles';

export class UserRolesStepDefinitions extends UserRolesPageObjects implements BaseStepDefinitions {

  constructor() {
    super();
    this.stepDefinitions();
  }

  stepDefinitions() {
    this.addCommonSteps(this.pageObjects, pageName, userRolesDataSets);

    Given(new RegExp(`^${pageName}: I visit CMS application "([^"]*)"$`), (url, callback) => {
      this.go(url).then(callback);
    });

    Then(new RegExp(`^${pageName}: I see "([^"]*)" button and I have "([^"]*)" create permission$`), {timeout: this.timeout}, (elementKey, permission, callback) => {
      let havePermission = permission === "Yes" ? 1 : 0;
      element.all(by.xpath(`//a[@title="${elementKey}"]`)).then(buttons => {
      expect(buttons.length).and.equal(havePermission);
      callback();
      });
    });

    Then(new RegExp(`^${pageName}: I see "([^"]*)" button I have "([^"]*)" view permission to click and check for "TACTICAL_CHECKLIST-MODERATOR"$`), {timeout: this.timeout}, (elementKey, permission, callback) => {
      let havePermission = permission === "Yes" ? true : false;
      const searchButton = this.pageObjects[userRolesDataSets[elementKey]];
      const buttonClick = searchButton.click();
      browser.wait(buttonClick,10000);
      const tacticalSearchChecklistItems = element.all(by.cssContainingText('.cmsitems-list__expanded-row', 'TACTICAL_CHECKLIST-MODERATOR'));
      const searchText = tacticalSearchChecklistItems.get(0).element(by.xpath('..')).getText().then(function (test) {
        if(test.indexOf('TACTICAL_CHECKLIST-MODERATOR') !== -1){
          expect(true).and.equal(havePermission);
        }
      });
      callback();
    });


    Then(new RegExp(`^${pageName}: I see "([^"]*)" button I have "([^"]*)" view permission to click and check for "OPERATIONAL_CHECKLIST-MODERATOR"$`), {timeout: this.timeout}, (elementKey, permission, callback) => {
      let havePermission = permission === "Yes" ? true : false;
      const searchButton = this.pageObjects[userRolesDataSets[elementKey]];
      const buttonClick = searchButton.click();
      browser.wait(buttonClick,10000);
      const tacticalSearchChecklistItems = element.all(by.cssContainingText('.cmsitems-list__expanded-row', 'OPERATIONAL_CHECKLIST-MODERATOR'));
      const searchText = tacticalSearchChecklistItems.get(0).element(by.xpath('..')).getText().then(function (test) {
        if(test.indexOf('TACTICAL_CHECKLIST-MODERATOR') !== -1){
          expect(true).and.equal(havePermission);
        }
      });
      callback();
    });

    Then(new RegExp(`^${pageName}: I see "([^"]*)" icon I have "([^"]*)" edit permission to click and check for "TACTICAL_CHECKLIST-MODERATOR"$`), {timeout: this.timeout}, (elementKey, permission, callback) => {
      let haveTacticalPermission = permission === "Yes" ? 1 : 0;
      console.log("Permission is " + haveTacticalPermission);
      const editButton = this.pageObjects[userRolesDataSets[elementKey]];
      const tacticalChecklistItems = element.all(by.cssContainingText('.cmsitems-list__expanded-row', 'TACTICAL_CHECKLIST-MODERATOR'));
      const editTactical = tacticalChecklistItems.get(0).element(by.xpath('..')).element(by.css('.edit-icon a'));
      if (expect(tacticalChecklistItems.count()).to.be != null) {
      if (haveTacticalPermission === 1) {
          editTactical.isPresent().then(result => expect(result).to.equal(true));
        } else {
          editTactical.isPresent().then(result => expect(result).to.equal(false));
        }
      }
      callback();
    });

    Then(new RegExp(`^${pageName}: I see "([^"]*)" icon have "([^"]*)" edit permission and I check for "OPERATIONAL_CHECKLIST-MODERATOR"$`), {timeout: this.timeout}, (elementKey, permission, callback) => {
      let haveOperationalPermission = permission === "Yes" ? 1 : 0;
      console.log("Permission is" + haveOperationalPermission);
      const editButton = this.pageObjects[userRolesDataSets[elementKey]];
      const operationalChecklistItems = element.all(by.cssContainingText('.cmsitems-list__expanded-row', 'OPERATIONAL_CHECKLIST-MODERATOR'));
      const editOperational = operationalChecklistItems.get(0).element(by.xpath('..')).element(by.css('.edit-icon a'));
      if (expect(operationalChecklistItems.count()).to.be != null) {
        if (haveOperationalPermission === 1) {
          editOperational.isPresent().then(result => expect(result).to.equal(true));
        } else {
          editOperational.isPresent().then(result => expect(result).to.equal(false));
        }
      }
      callback();
    });

  }
}
export const userRolesStepDefinitions = new UserRolesStepDefinitions();
