
var selenium = require('selenium-webdriver');
var Builder = selenium.Builder;
var Browser = selenium.Browser;

async function firstTest() {
    var driver = null;

    try {
        console.log('Iniciando prueba Selenium...');

        driver = await new Builder()
            .forBrowser(Browser.CHROME)
            .build();

        console.log('Abriendo pagina web...');

        await driver.get(
            'https://www.selenium.dev/selenium/web/web-form.html'
        );

        // Obtener titulo
        var title = await driver.getTitle();

        // Obtener URL
        var currentUrl = await driver.getCurrentUrl();

        console.log('Titulo de la pagina:', title);
        console.log('URL actual:', currentUrl);

        console.log('PRUEBA EXITOSA');

        await new Promise(function(resolve) {
            setTimeout(resolve, 10000);
        });

    } catch (error) {
        console.log('ERROR:', error.message);

    } finally {
        if (driver !== null) {
            await driver.quit();
        }
    }
}

firstTest();
