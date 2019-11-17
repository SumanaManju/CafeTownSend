The automation test are created in Protractor, so you will need NodeJS to run it, steps to install it:
1. Install Intellij
2. Install NodeJS (If you dont have it)
3. Install NPM (If you dont have it)
4. Execute command: `npm install`
5. Execute command: `webdriver-manager update`
6. Execute command: `webdriver-manager start`
7. Execute command: `npm-run-all -s "e2e:config -- --BASE_URL=https://cafetownsend-angular-rails.herokuapp.com/login --setup=prod"`
