// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const Reporter = require('./reporter');
const helpers = require('./helpers').helpers;
const jsonReportsPath = './e2e/cucumber/reports/json';

exports.config = {

  /**
    * NOTE: To run this tests the application must be running in localhost:4200.
    * config.baseUrl = process.env['baseUrl'] || 'http://localhost:4200/';
    * config.seleniumAddress = 'http://localhost:4444/wd/hub'
   * http://selenium.devnet.klm.com:4444/wd/hub
   */
  baseUrl: helpers.getBaseURL(),

  seleniumAddress: 'http://selenium.devnet.klm.com:4444/wd/hub',

  // Use a custom framework adapter and set its relative path
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  // suites: {}, // If run with --suite=smoke or --suite=smoke,full only the patterns matched by the specified suites will run.
  specs: helpers.getFeatureFiles(),

  // Cucumber command line options
  cucumberOpts: {
    strict: true,
    require: helpers.getStepFiles(),
    compiler: ['ts:ts-node/register'],
    tags: false,
    format: helpers.getJsonFile(),
    keepAlive: false,
    profile: false,
    'no-source': true,
    tags: helpers.getIgnores(), // Ex -['~@ignore'] : <string[]> (expression) only execute the features or scenarios with tags matching the expression
  },
  onPrepare: function() {
    browser.ignoreSynchronization = true;
    browser.driver.manage().window().setSize(1366, 768);
    require('ts-node').register({
      project: './e2e/tsconfig.e2e.json'
    });

    helpers.setE2ETestData();
    Reporter.createDirectory(jsonReportsPath);
  },
  onComplete: function () {
    Reporter.createHTMLReport();
  },
    /**
     * Angular 2 configuration
     *
     * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
     * `rootEl`
     */
    useAllAngular2AppRoots: true,
    allScriptsTimeout: (60 * 1000),
    waitForAngular: true
};
