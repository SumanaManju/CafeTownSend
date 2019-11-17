const https = require('https');
const syncRequest = require('sync-request');
const path = require('path');
const argv = require('yargs').argv;
const stepsConfig = require('./steps.conf.json');
const jsonReportsFile = './e2e/cucumber/reports/json/cucumber_report.json';
var e2eTestData = null;

var Helpers = function () {

  // Helper functions
  this._root = path.resolve(__dirname, '..');

  this.hasProcessFlag = function (flag) {
    return process.argv.join('').indexOf(flag) > -1;
  }

  this.root = function (args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [this._root].concat(args));
  }

  this.rootNode = function (args) {
    args = Array.prototype.slice.call(arguments, 0);
    return this.root.apply(path, ['node_modules'].concat(args));
  }

  this.prependExt = function (extensions, args) {
    args = args || [];
    if (!Array.isArray(args)) {
      args = [args];
    }
    return extensions.reduce(function (memo, val) {
      return memo.concat(val, args.map(function (prefix) {
        return prefix + val;
      }));
    }, ['']);
  }

  this.packageSort = function (packages) {
    // packages = ['polyfills', 'vendor', 'main']
    const len = packages.length - 1;
    const first = packages[0];
    const last = packages[len];
    return function sort(a, b) {
      // polyfills always first
      if (a.names[0] === first) {
        return -1;
      }
      // main always last
      if (a.names[0] === last) {
        return 1;
      }
      // vendor before app
      if (a.names[0] !== first && b.names[0] === last) {
        return -1;
      } else {
        return 1;
      }
      // a must be equal to b
      return 0;
    };
  }

  this.reverse = function (arr) {
    return arr.reverse();
  }

  this.getBaseURL = function () {
    const BASE_URL = argv.BASE_URL || process.env.BASE_URL || '';
    if (BASE_URL && BASE_URL.trim().length > 0) {
      console.log('... Loading BASE_URL via command line Arguments ===>', BASE_URL);
      return BASE_URL;
    } else {
      return 'http://localhost:4200/';
    }
  }

  this.getIgnores = function() {
    const setupArgs = argv.setup || process.env['setup'] || '';
    let ignoreTags = [];
    if (setupArgs === 'local') {
      ignoreTags.push('~@IgnoreForLocalhost');
    }
    return ignoreTags;
  }

  this.getEnv = function() {
    const setupArgs = argv.setup || process.env['setup'] || '';
    if (setupArgs === 'local') {
      return 'localhost';
    }
    return 'production';
  }

  /**
   * Get the feature files that need to be run based on an command line flag that
   * is passed, if nothing is passed all the feature files are run
   *
   * @example:
   *
   * <pre>
   *     // For 1 features
   *     npm run e2e -- --features=playground
   *
   *     // For multiple features
   *     npm run e2e -- --features=playground,dashboard,...
   *
   *     // Else
   *     npm run e2e
   * </pre>
   *
   * @return {Array<string>}
   * ["../features/*.feature"]
   */
  this.getFeatureFiles = function () {
    const featureArgs = argv.features || process.env['features'] || '';
    const setupArgs = argv.setup || process.env['setup'] || '';

    if (featureArgs && featureArgs.trim().length > 0) {
      console.log('... loading feature files by parameters. features = ' + featureArgs);
      return featureArgs.split(',').map(feature => `${process.cwd()}/e2e/cucumber/pages/${feature}/features/*.feature`);
    } else {
      console.log('... loading ALL feature files based on env ===>', setupArgs);
      console.log('===>', stepsConfig[setupArgs].features);
      return stepsConfig[setupArgs].features;
    }
  }

  this.getStepFiles = function () {
    const setupArgs = argv.setup || process.env['setup'] || '';
    return stepsConfig[setupArgs].steps;
  }

  this.getJsonFile = function () {
    return ['node_modules/cucumber-pretty', `json:${jsonReportsFile}`];
  }

  this.getExternalTestData = async function(testDataUrl) {
    return new Promise(function (resolve, reject) {
      https.get(testDataUrl, function (resp) {
        let data = '';

        resp.on('data', function (chunk) {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', function () {
          resolve(JSON.parse(data));
        });

      }).on('error', function (err) {
        console.log('Error: ' + err.message);
        reject(err.message)
      });
    });
  }

  this.getURLData = function() {
    return new Promise(function (resolve, reject) {
      getJSONData().then(function(data){
        resolve(data);
      });
    });
  }

  this.setE2ETestData = async function () {
    const TEST_DATA_URL = argv.TEST_DATA_URL || process.env.TEST_DATA_URL || '';

    if (TEST_DATA_URL) {
      var json = syncRequest('GET', TEST_DATA_URL );
      e2eTestData = JSON.parse(json.getBody('utf8'));
    } else {
      e2eTestData = require('../test-data/test.data.json');
    }
  }

  this.getE2ETestData = function () {
    return e2eTestData;
  }

}

const helpers = new Helpers();

module.exports = {
  helpers : helpers
}
