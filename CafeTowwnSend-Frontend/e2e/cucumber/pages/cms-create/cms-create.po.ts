import { by, element, browser } from 'protractor';
import { CommonPageObjects } from '../base/page-objects/common.po';
import { CommonStepDefinitions } from '../base/steps/common.steps';
import { BasePageObjects } from '../base/page-objects/base.po';

export class CreatePageObjects extends CommonStepDefinitions implements BasePageObjects {

  pageObjects = {
    searchPage: element(by.css('.cms-search-panel')),
    addItemButton: element(by.xpath('//a[@title="Add Item"]')),
    searchButton: element(by.xpath('//a[@title="Search"]')),
    createPage: element(by.css('.cms-edit-form-panel')),
    departureStation: element(by.name('departureStation')),
    arrivalStation: element(by.name('arrivalStation')),
    flightNumber: element(by.name('flightNumber')),
    aircraftTypeDropdown: element(by.name('aircraftType')),
    aircraftType: (text: string) => element(by.cssContainingText('.mat-option-text', text)),
    addApplicableFlightButton: element(by.xpath('//span[contains(text(), "Add applicaple flight")]')),
    areaDropdown: element(by.name('areas')),
    area: (text: string) => element(by.cssContainingText('.mat-option-text', text)),
    categoryDropdown: element(by.name('category')),
    category: (text: string) => element(by.cssContainingText('.mat-option-text', text)),
    itemTypeDropdown: element(by.name('itemType')),
    itemType: (text: string) => element(by.cssContainingText('.mat-option-text', text)),
    flightPhaseDropdown: element(by.name('flightPhase')),
    flightPhase: (text: string) => element(by.cssContainingText('.mat-option-text', text)),
    processStepDropdown: element(by.name('processStep')),
    processStep: (text: string) => element(by.cssContainingText('.mat-option-text', text)),
    headline: element(by.name('itemHeadline')),
    createButton: element(by.xpath('//span[contains(text(), "Create")]')),
    myChecklistItem: (text: string) => element(by.cssContainingText('.cmsitems-list__expanded-row', text))
  };
}

export const createPageObjects = new CreatePageObjects();
