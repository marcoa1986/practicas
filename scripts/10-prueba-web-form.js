
var selenium = require('selenium-webdriver');
var Builder = selenium.Builder;
var By = selenium.By;

async function prueba() {
    var driver = null;

    try {
        console.log('PASO 1: Iniciando Chrome');

        driver = await new Builder()
            .forBrowser('chrome')
            .build();

        console.log('PASO 2: Abriendo pagina');

        await driver.get(
            'https://www.selenium.dev/selenium/web/web-form.html'
        );

        console.log('PASO 3: Escribiendo texto');

        await driver.findElement(By.name('my-text'))
            .sendKeys('Prueba NGNIX');

        console.log('PASO 4: Enviando formulario');

        await driver.findElement(By.css('button'))
            .click();

        var resultado = await driver.findElement(By.id('message'))
            .getText();

        console.log('RESULTADO:', resultado);

        if (resultado === 'Received!') {
            console.log('PRUEBA EXITOSA');
        }

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

prueba();
