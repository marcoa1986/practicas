
const { Builder } = require('selenium-webdriver');

async function verificarNavegacion() {
    let driver;

    try {
        driver = await new Builder()
            .forBrowser('chrome')
            .build();

        console.log('1. Chrome se abrió');

        const urlObjetivo = 'https://www.selenium.dev/selenium/web/web-form.html';

        console.log('2. Intentando navegar a:', urlObjetivo);

        await driver.get(urlObjetivo);

        console.log('3. Navegación ejecutada');

        const urlActual = await driver.getCurrentUrl();
        const titulo = await driver.getTitle();

        console.log('4. URL actual:', urlActual);
        console.log('5. Título:', titulo);

    } catch (error) {
        console.error('ERROR DE NAVEGACIÓN:', error);

    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}

verificarNavegacion();
