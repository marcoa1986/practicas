const {Builder, Browser} = require('selenium-webdriver');
(async function firstTest() {
    let driver;
driver=await new Builder().forBrowser(Browser.CHROME).build();
}())