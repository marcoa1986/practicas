
const { Builder, By, until } = require('selenium-webdriver');

const buscarElemento = require('./selectorHelper');

async function ejecutarPrueba() {

    const driver = await new Builder()
        .forBrowser('chrome')
        .build();

    try {

        // 1. Abrir SauceDemo
        await driver.get('https://www.saucedemo.com/');

        console.log('Página SauceDemo abierta');

        // 2. Buscar campo de usuario
        const usuario = await buscarElemento(driver, [

            { nombre: 'ID', localizador: By.id('user-name') },

            { nombre: 'data-test', localizador: By.css('[data-test="username"]') },

            { nombre: 'Name', localizador: By.name('user-name') },

            { nombre: 'XPath relativo', localizador: By.xpath('//input[@placeholder="Username"]') }

        ]);

        await usuario.sendKeys('standard_user');

        // 3. Buscar campo de contraseña
        const password = await buscarElemento(driver, [

            { nombre: 'ID', localizador: By.id('password') },

            { nombre: 'data-test', localizador: By.css('[data-test="password"]') },

            { nombre: 'Name', localizador: By.name('password') },

            { nombre: 'XPath relativo', localizador: By.xpath('//input[@type="password"]') }

        ]);

        await password.sendKeys('secret_sauce');

        // 4. Buscar botón Login
        const login = await buscarElemento(driver, [

            { nombre: 'ID', localizador: By.id('login-button-incorrecto') },

            { nombre: 'data-test', localizador: By.css('[data-test="login-button"]') },

            { nombre: 'Name', localizador: By.name('login-button') },

            { nombre: 'CSS', localizador: By.css('input[type="submit"][value="Login"]') },

            { nombre: 'XPath relativo', localizador: By.xpath('//input[@type="submit" and @value="Login"]') }

        ]);

        // 5. Ejecutar Login
        await login.click();

        // 6. Validar resultado
        await driver.wait(
            until.urlContains('inventory.html'),
            10000
        );

        const urlActual = await driver.getCurrentUrl();

        if (!urlActual.includes('inventory.html')) {
            throw new Error('No se completó el inicio de sesión');
        }

        console.log('PRUEBA EXITOSA: Login completado');

        console.log('URL:', urlActual);

    } catch (error) {

        console.error('PRUEBA FALLIDA:', error.message);

        throw error;

    } finally {

        await driver.quit();

    }
}

ejecutarPrueba().catch(() => {
    process.exitCode = 1;
});
