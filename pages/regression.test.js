const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Builder } = require('selenium-webdriver');

const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const users = require('../data/users');

test('REG-001: regresión de login, inventario y carrito', async () => {
  const driver = await new Builder()
    .forBrowser('chrome')
    .build();

  try {
    const login = new LoginPage(driver);
    const inventory = new InventoryPage(driver);

    // Login
    await login.open();

    await login.login(
      users.standard.username,
      users.standard.password
    );

    await inventory.waitForInventory();

    const url = await driver.getCurrentUrl();
    const loginPassed = url.includes('inventory.html');

    // Inventario
    const title = await inventory.getTitle();
    const inventoryPassed = title === 'Products';

    const productCount = await inventory.getProductCount();
    const productsVisible = productCount > 0;

    // Carrito
    await inventory.addBackpackToCart();

    const cartCount = await inventory.getCartCount();
    const cartPassed = cartCount === 1;

    // Resultado global
    const regressionPassed =
      loginPassed &&
      inventoryPassed &&
      productsVisible &&
      cartPassed;

    assert.strictEqual(
      regressionPassed,
      true,
      'La regresión web presentó errores'
    );

    console.log('PASS: Regresión web');

  } finally {
    await driver.quit();
  }
});