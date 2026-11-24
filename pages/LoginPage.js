const { By, until } = require('selenium-webdriver');

class LoginPage {
  constructor(driver) {
    this.driver = driver;

    this.username = By.id('user-name');
    this.password = By.id('password');
    this.loginButton = By.id('login-button');
    this.errorMessage = By.css('[data-test="error"]');
  }

  async open() {
    await this.driver.get('https://www.saucedemo.com/');
  }

  async login(username, password) {
    await this.driver.findElement(this.username).sendKeys(username);
    await this.driver.findElement(this.password).sendKeys(password);
    await this.driver.findElement(this.loginButton).click();
  }

  async getErrorMessage() {
    await this.driver.wait(
      until.elementLocated(this.errorMessage),
      5000
    );

    return await this.driver
      .findElement(this.errorMessage)
      .getText();
  }
}

module.exports = LoginPage;