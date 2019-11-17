const Reporter = require('./reporter');

Reporter.rmDir(`${process.cwd()}/e2e/cucumber/reports/html`, false)
Reporter.rmDir(`${process.cwd()}/e2e/cucumber/reports/screenshots`, false)
Reporter.createHTMLReport();
