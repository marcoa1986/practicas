const {Builder, Browser} = require('selenium-webdriver');

(async function firstTest() {
  let driver; 
  driver = await new Builder().forBrowser(Browser.CHROME).build();
  await driver.get("https://www.selenium.dev/selenium/web/web-form.html");  
  await dirver.naviagte().back();
  await driver.navigate().forward();
  await driver.navigate().refresh();
}())