import { by, element, browser } from 'protractor';
import { CommonPageObjects } from '../base/page-objects/common.po';
import { CommonStepDefinitions } from '../base/steps/common.steps';
import { BasePageObjects } from '../base/page-objects/base.po';

export class CmsSearchPageObjects extends CommonStepDefinitions implements BasePageObjects {
  pageObjects = {
    departureStation: element(by.name('departureStation')),
    arrivalStation: element(by.name('arrivalStation')),
    flightNumber: element(by.name('flightNumber')),
    aircraftTypeDropdown: element(by.name('aircraftType')),
    aircraftType: (text: string) => element(by.cssContainingText('.mat-option', text)),
    searchButton: element(by.xpath('//a[@title="Search"]')),
    noDataContainer: (text: string = 'No Data Found') => element(by.cssContainingText('.cms-list-panel .no-result', text)),
  };
}

export const cmsSearchPageObjects = new CmsSearchPageObjects();
