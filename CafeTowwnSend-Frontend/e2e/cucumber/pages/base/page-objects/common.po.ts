import { browser, by, element, ExpectedConditions as EC, ElementFinder } from 'protractor';
import { BasePageObjects } from './base.po';
import { WebElementCondition } from 'selenium-webdriver';

const argv = require('yargs').argv;

export class CommonPageObjects implements BasePageObjects {

  readonly timeout = 60 * 1000;
  readonly timeoutClick = 2 * 1000;

  pageObjects = {};

  navigateTo(url?: string) { return (url ? browser.get(url) : browser.get('/')); }

  setValue(elements, value) {
    return elements.sendKeys(value);
  }

  getElementById(elementId: string) {
    return element(by.id(elementId));
  }

  getElementByClass(elementClass: string) {
    return element(by.className(elementClass));
  }

  getElementByCssSelector(elementSector: string) {
    return element(by.css(elementSector));
  }

  getAllElementsByCssSelector(elementSector: string) {
    return element.all(by.css(elementSector));
  }

  getElementByText(elementSector: string, text: string) {
    return element.all(by.cssContainingText(elementSector, text)).get(0);
  }

  getKeyByValue(obj, value) {
    return Object.keys(obj)[Object.values(obj).indexOf(value)];
  }

  // Helper Method - Checks that the current URL matches the expected text
  waitforURLMatchInCurrentURL(URL: string) {
    return browser.wait(EC.urlIs(URL), this.timeout);
  }

  // Helper Method - Checks that the current URL contains the expected text
  waitforTextMatchInCurrentURL(Text: string) {
    return browser.wait(EC.urlContains(Text), this.timeout);
  }

  // Helper Method - Wait for the element present in the DOM
  waitForPresent(ele: ElementFinder) {
    return browser.wait(EC.presenceOf(ele));
  }

  // Helper Method - Wait for the element display in the DOM
  waitForDisplay(ele) {
    return browser.wait(ele.isDisplayed);
  }

  // Helper Method - Wait for the element presence and display in the DOM
  waitForElement(ele) {
    return this.waitForPresent(ele);
  }

  loadingPage() {
    return element.all(by.xpath('//app-root/div'));
  }

  loadingElement() {
    return element.all(by.xpath('//app-root/div')).get(0);
  }

  loadingCompleted() {
    return element.all(by.xpath('//app-root/div')).get(0);
  }

  go(url: string) {
    return browser.get(url);
  }

}

export const commonPageObjects = new CommonPageObjects();
