The automation test are created in Protractor, so you will need NodeJS to run it, steps to install it:
1. Install Intellij
2. Install NodeJS (If you dont have it)
3. Install NPM (If you dont have it)
4. Execute command: `npm install`
5. Execute command: `npm install -g protractor`
6. Execute command: `npm install -g cucumber`
7. Execute command: `npm install --save-dev protractor-cucumber-framework`
8. Execute command: `npm install chai chai-as-promised`
9. Execute command: `webdriver-manager update`
10. Execute command: `webdriver-manager start`

Note: Execute the below commands ONLY if you get the port number busy, ignore the below commands if the selenium webdriver is up and running after giving the above command.
While executing webdriver-manager start command, if the port is busy then execute the below steps:

10.a netstat -ano | findstr :4444(Give the respective port number in place of 4444)
10.b taskkill /PID 1211 /F(Give the respective PID number in place of 1211 which you will get after giving the first command).

11.Execute command: `npm-run-all -s "e2e:config -- --BASE_URL=https://cafetownsend-angular-rails.herokuapp.com/login --setup=prod"`

Note: If you encounter any error after executing the above command, just navigate to intellij project and go to package.json -> Click the green run button on "e2e:ite" -> 
Click on Run 'e2e:ite'.
