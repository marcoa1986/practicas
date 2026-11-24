const { By, until } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        // Localizadores reales del DOM de SauceDemo
        this.usernameInput = By.id('user-name');
        this.passwordInput = By.id('password');
        this.loginButton = By.id('login-button');
        this.pageTitle = By.css('.title'); // Aparece tras iniciar sesión
    }

    async open() {
        await this.driver.get('https://www.saucedemo.com/');
    }

    async login(username, password) {
        const userField = await this.driver.wait(until.elementLocated(this.usernameInput), 5000);
        await userField.sendKeys(username);

        await this.driver.findElement(this.passwordInput).sendKeys(password);
        await this.driver.findElement(this.loginButton).click();
    }

    async getHeaderTitle() {
        const titleElement = await this.driver.wait(until.elementLocated(this.pageTitle), 5000);
        return await titleElement.getText();
    }
}

module.exports = LoginPage;
