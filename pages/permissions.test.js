const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Builder, until } = require('selenium-webdriver');

const LoginPage = require('../pages/LoginPage');
const users = require('../data/users');

test('PER-001: usuario bloqueado no debe acceder', async () => {
  const driver = await new Builder()
    .forBrowser('chrome')
    .build();

  try {
    const login = new LoginPage(driver);

    await login.open();

    await login.login(
      users.locked.username,
      users.locked.password
    );

    const error = await login.getErrorMessage();
    const currentUrl = await driver.getCurrentUrl();

    const accessDenied =
      error.includes('locked out') &&
      !currentUrl.includes('inventory.html');

    assert.strictEqual(
      accessDenied,
      true,
      'El usuario bloqueado consiguió acceder'
    );

    console.log('PASS: Acceso restringido');

  } finally {
    await driver.quit();
  }
});