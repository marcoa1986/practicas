const { By, until } = require('selenium-webdriver');

class InventoryPage {
  constructor(driver) {
    this.driver = driver;

    this.title = By.className('title');
    this.products = By.className('inventory_item');
    this.addBackpack = By.id(
      'add-to-cart-sauce-labs-backpack'
    );
    this.cart = By.className('shopping_cart_link');
    this.cartBadge = By.className('shopping_cart_badge');
  }

  async waitForInventory() {
    await this.driver.wait(
      until.urlContains('inventory.html'),
      10000
    );
  }

  async getTitle() {
    return await this.driver.findElement(this.title).getText();
  }

  async getProductCount() {
    const products = await this.driver.findElements(this.products);
    return products.length;
  }

  async addBackpackToCart() {
    await this.driver.findElement(this.addBackpack).click();
  }

  async getCartCount() {
    const badges = await this.driver.findElements(this.cartBadge);

    if (badges.length === 0) {
      return 0;
    }

    return Number(await badges[0].getText());
  }

  async openCart() {
    await this.driver.findElement(this.cart).click();
  }
}

module.exports = InventoryPage;