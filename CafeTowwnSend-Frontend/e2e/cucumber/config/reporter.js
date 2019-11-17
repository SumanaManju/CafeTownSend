const fs = require('fs');
const os = require('os');
const mkdirp = require('mkdirp');
const path = require('path');
const argv = require('yargs').argv;
const reporter = require('cucumber-html-reporter');
const report = require('cucumber-html-report');
const environment = process.env;
const metaData = require('../../../../package.json');
const htmlReports = `${process.cwd()}/e2e/cucumber/reports/html`;
const cucumberReports = `${process.cwd()}/e2e/cucumber/reports`;
const targetJson = `${process.cwd()}/e2e/cucumber/reports/json/cucumber_report.json`;

const cucumberReportOptions = {
  source:       targetJson,                       // source json
  dest:         htmlReports,                      // target directory (will create if not exists)
  name:         'cucumber_report.html',           // report file name (will be index.html if not exists)
  title:        metaData.name,                    // Title for default template. (default is Cucumber Report)
  screenshots:  `${cucumberReports}/screenshots/`, // Path to the directory of screenshots. Optional.
}

const cucumberReporteroptions = {
  theme: 'bootstrap',
  brandTitle: metaData.name,
  jsonFile: `${cucumberReports}/json/cucumber_report.json`,
  output: `${cucumberReports}/html/cucumber_reporter.html`,
  reportSuiteAsScenarios: true,
  launchReport: true,
  screenshotsDirectory: `${cucumberReports}/screenshots/`,
  storeScreenshots: true,
  metadata: {
    'App Name': metaData.name,
    'App Version': metaData.version,
    'App Description': metaData.description,
    'Author': metaData.author,
    'Base Url': argv.BASE_URL,
    'StartTime' : '',
    'Browser': 'Chrome',
    'EndTime' : '',
    'Platform': os.platform(),
    'Parallel': 'Scenarios',
    'Executed': 'Remote'
  }
};

class Reporter {

  /**
   * Create an directory
   * @param {*} dirName
   */
  static createDirectory(dirName) {
    //Check if the directory exist
    if (!fs.existsSync(dirName)) {
      mkdirp.sync(dirName);
    }
  }

  static rmDir(dirPath, removeSelf) {
    if (removeSelf === undefined)
      removeSelf = true;
    try { var files = fs.readdirSync(dirPath); }
    catch(e) { return; }
    if (files.length > 0)
      for (var i = 0; i < files.length; i++) {
        var filePath = path.join(dirPath, files[i]);
        if (fs.statSync(filePath).isFile())
          fs.unlinkSync(filePath);
        else
          rmDir(filePath);
      }
    if (removeSelf)
      fs.rmdirSync(dirPath);
  }

  /**
   * Create an html report output
   */
  static createHTMLReport() {
    try {
      //invoke cucumber-html-reporter
      reporter.generate(cucumberReporteroptions);
      report.create(cucumberReportOptions).then(function () {
          //invoke cucumber-html-report
          console.log('cucumber_report.html created successfully!');
        })
        .catch(function (err) {
          if (err) {
            console.error(err);
          }
        });
    } catch (err) {
      if (err) {
        console.log('Failed to save cucumber test results to json file.');
        console.log(err);
      }
    }
  }

  /**
   * Allure reports method, would work only with cucumber 1.3.x & less versions
   * Currently incompatible with latest cucumber 3.x version
   */
  static createAllureXML() {
    const allureReporter = require('cucumberjs-allure-reporter');
    const xmlReports = process.cwd() + '/reports/xml';
    Reporter.createDirectory(xmlReports);
    allureReporter.config({
      targetDir: xmlReports
    })
  }
}

module.exports = Reporter;
