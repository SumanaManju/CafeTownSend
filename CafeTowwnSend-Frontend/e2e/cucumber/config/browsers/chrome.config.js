'use strict';

exports.config = chromeConfig();

function chromeConfig() {
  return {
    browserName: 'chrome',
    chromeOptions: {
      // Get rid of --ignore-certificate yellow warning - 'disable-infobars',
      args: ['--no-sandbox', '--test-type=browser'],

      prefs: {
        download: {
          credentials_enable_service: false,
          profile: {
            password_manager_enabled: false
          },
          // Set download path and avoid prompting for download even though
          // this is already the default on Chrome but for completeness
          prompt_for_download: false,
          directory_upgrade: true,
          default_directory: '/e2e/downloads/'
        }
      }
    },
    shardTestFiles: false,
    maxInstances: 5,
    requireWindowFocus: false
  };
}
