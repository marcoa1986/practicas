const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Builder } = require('selenium-webdriver');

const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CheckoutPage = require('../pages/CheckoutPage');
const users = require('../data/users');

test('FLOW-001: comprar una mochila', async () => {
  const driver = await new Builder()
    .forBrowser('chrome')
    .build();

  try {
    const login = new LoginPage(driver);
    const inventory = new InventoryPage(driver);
    const checkout = new CheckoutPage(driver);

    // 1. Login
    await login.open();

    await login.login(
      users.standard.username,
      users.standard.password
    );

    await inventory.waitForInventory();

    // 2. Agregar producto
    await inventory.addBackpackToCart();

    const cartCount = await inventory.getCartCount();

    const productAdded = cartCount === 1;

    assert.strictEqual(
      productAdded,
      true,
      'El producto no se agregó al carrito'
    );

    // 3. Abrir carrito
    await inventory.openCart();

    // 4. Iniciar checkout
    await checkout.startCheckout();

    // 5. Datos del comprador
    await checkout.enterCustomerData(
      'QA',
      'Tester',
      '09420'
    );

    await checkout.continueCheckout();

    // 6. Finalizar compra
    await checkout.finishCheckout();

    const message = await checkout.getConfirmation();

    const purchaseCompleted =
      message.includes('Thank you for your order');

    assert.strictEqual(
      purchaseCompleted,
      true,
      'La compra no se completó correctamente'
    );

    console.log('PASS: Compra completada');

  } finally {
    await driver.quit();
  }
});