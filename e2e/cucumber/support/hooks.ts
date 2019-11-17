import { Status,  BeforeAll, Before, After, AfterAll } from 'cucumber';
import { browser, by, element, ExpectedConditions } from 'protractor';
import { commonPageObjects } from '../pages/base/page-objects/common.po';

const argv = require('yargs').argv;

/**
 * Go the angular starter page before to start eah test
 */
BeforeAll({timeout: 30 * 1000}, (callback) => {
  browser.ignoreSynchronization = true;
  browser.get(argv.BASE_URL).then(() => {
    callback();
  });
});

Before('@before', () => {});

After({timeout: 10 * 1000}, (scenario) => {
  if (scenario.result.status === Status.FAILED) {
    const attach = this.attach;
    return browser.takeScreenshot().then((png) => {
      const decodedImage = new Buffer(png, 'base64');
      return attach(decodedImage, 'image/png');
    });
  }
});

AfterAll(() => {
  browser.close(); // Close the chrome window
});

