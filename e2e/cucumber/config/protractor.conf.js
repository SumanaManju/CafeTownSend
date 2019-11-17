'use strict';

// Protractor basic configuration for End to end test automation
const config = require('./protractor.shared.conf').config;
const chrome = require('./browsers/chrome.config').config;
const firefox = require('./browsers/firefox.config').config;


// Use the standalone Selenium server.
chrome.directConnect = false;
firefox.shardTestFiles = false;
// For single browser testing
config.capabilities = firefox;

// For multiple browser testing
// config.multiCapabilities = [chrome, firefox];

exports.config = config;

