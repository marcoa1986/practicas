const { test } = require('node:test');
const assert = require('node:assert');
const { Builder, By, until } = require('selenium-webdriver');
const readline = require('node:readline/promises');

test('LOGIN-001 - Inicio de sesión exitoso', async () => {

    const driver = await new Builder()
        .forBrowser('chrome')
        .build();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    try {

        // 1. Abrir SauceDemo
        await driver.get('https://www.saucedemo.com/');

        // 2. Pausar automatización
        console.log('\n======================================');
        console.log(' AUTOMATIZACIÓN PAUSADA');
        console.log(' Chrome está abierto en SauceDemo');
        console.log(' Puedes inspeccionar con F12');
        console.log('======================================\n');

        await rl.question('Presiona ENTER para continuar con Selenium...');

        // 3. Ingresar usuario
        await driver.findElement(By.id('user-name'))
            .sendKeys('standard_user');

        // 4. Ingresar contraseña
        await driver.findElement(By.id('password'))
            .sendKeys('secret_sauce');

        // 5. Clic en Login
        await driver.findElement(By.id('login-button'))
            .click();

        // 6. Esperar que cargue inventario
        await driver.wait(
            until.urlContains('inventory.html'),
            10000
        );

        // 7. Obtener URL actual
        const urlActual = await driver.getCurrentUrl();

        // 8. Assert
        const resultado = urlActual.includes('inventory.html');

        assert.strictEqual(
            resultado,
            true,
            'El inicio de sesión debería ser exitoso'
        );

        console.log('\nRESULTADO:', resultado ? 'PASS' : 'FAIL');
        console.log('URL:', urlActual);

    } finally {

        rl.close();
        await driver.quit();

    }
});