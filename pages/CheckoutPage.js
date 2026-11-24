const { By, until } = require('selenium-webdriver');

class CheckoutPage {
  constructor(driver) {
    this.driver = driver;

    this.checkoutButton = By.id('checkout');
    this.firstName = By.id('first-name');
    this.lastName = By.id('last-name');
    this.postalCode = By.id('postal-code');
    this.continueButton = By.id('continue');
    this.finishButton = By.id('finish');
    this.confirmation = By.className('complete-header');
  }

  async startCheckout() {
    await this.driver.findElement(this.checkoutButton).click();
  }

  async enterCustomerData(first, last, postal) {
    await this.driver.findElement(this.firstName).sendKeys(first);
    await this.driver.findElement(this.lastName).sendKeys(last);
    await this.driver.findElement(this.postalCode).sendKeys(postal);
  }

  async continueCheckout() {
    await this.driver.findElement(this.continueButton).click();
  }

  async finishCheckout() {
    await this.driver.findElement(this.finishButton).click();

    await this.driver.wait(
      until.elementLocated(this.confirmation),
      10000
    );
  }

  async getConfirmation() {
    return await this.driver
      .findElement(this.confirmation)
      .getText();
  }
}

module.exports = CheckoutPage;