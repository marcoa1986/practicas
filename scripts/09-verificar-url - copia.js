
const { Builder } = require('selenium-webdriver');

async function verificarURL() {
    let driver;

    try {
        console.log('INICIO DE PRUEBA');

        driver = await new Builder()
            .forBrowser('chrome')
            .build();

        console.log('Chrome iniciado');

        await driver.get(
            'https://the-internet.herokuapp.com/login'
        );

        console.log('Navegación ejecutada');

        console.log('URL:', await driver.getCurrentUrl());
        console.log('Título:', await driver.getTitle());

        await driver.sleep(5000);

    } catch (error) {
        console.error('ERROR:', error.message);

    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}

verificarURL();
