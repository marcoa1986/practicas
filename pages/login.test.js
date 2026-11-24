const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Builder } = require('selenium-webdriver');

const LoginPage = require('../pages/LoginPage');
const users = require('../data/users');

test('LOGIN-001: acceso con credenciales correctas', async () => {
  const driver = await new Builder()
    .forBrowser('chrome')
    .build();

  try {
    const login = new LoginPage(driver);

    await login.open();
    await login.login(
      users.standard.username,
      users.standard.password
    );

    await driver.wait(
      require('selenium-webdriver').until.urlContains('inventory.html'),
      10000
    );

    const url = await driver.getCurrentUrl();
    const isLoggedIn = url.includes('inventory.html');

    assert.strictEqual(
      isLoggedIn,
      true,
      'No se pudo iniciar sesión'
    );

    console.log('PASS: Login exitoso');

  } finally {
    await driver.quit();
  }
});

test('LOGIN-002: bloquear usuario bloqueado', async () => {
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

    const accessDenied = error.includes(
      'Sorry, this user has been locked out'
    );

    assert.strictEqual(
      accessDenied,
      true,
      'El sistema no mostró el bloqueo esperado'
    );

    console.log('PASS: Usuario bloqueado');

  } finally {
    await driver.quit();
  }
});