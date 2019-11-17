import { by, element, browser } from 'protractor';
import { CommonPageObjects } from '../base/page-objects/common.po';
import { CommonStepDefinitions } from '../base/steps/common.steps';
import { BasePageObjects } from '../base/page-objects/base.po';

export class CmsEditPageObjects extends CommonStepDefinitions implements BasePageObjects {
  pageObjects = {
    myChecklistItem: (text: string = 'E2E test header') => element.all(by.cssContainingText('.cmsitems-list__expanded-row', text)).first(),
    edit: element(by.css('.cms-edit-form-panel')),
    flightDetails: element(by.css('.flight-group .mat-header-row + .mat-row')),
    departureStation: element(by.name('departureStation')),
    arrivalStation: element(by.name('arrivalStation')),
    flightNumber: element(by.name('flightNumber')),
    aircraftTypeDropdown: element(by.name('aircraftType')),
    aircraftType: (text: string) => element(by.cssContainingText('.mat-option', text)),
    addApplicableFlightButton: element(by.xpath('//span[contains(text(), "Add applicaple flight")]')),
    headline: element(by.name('itemHeadline')),
    saveButton: element(by.xpath('//span[contains(text(), "Save")]')),
    search: element(by.css('.cms-search-panel')),
    searchButton: element(by.xpath('//a[@title="Search"]')),
  };
}

export const cmsEditPageObjects = new CmsEditPageObjects();
