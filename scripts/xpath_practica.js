const { Builder, By } = require('selenium-webdriver');
const readline = require('readline');

async function practicaXPath() {

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

        console.log('SauceDemo abierto.');
        console.log('Inspecciona el DOM con Chrome DevTools.');
        console.log('Prueba Copy XPath y Copy full XPath.');

        // 2. Pausar para inspección manual
        await new Promise(resolve => {
            rl.question('Presiona ENTER para continuar con Selenium...', resolve);
        });

        // 3. XPath relativo
        const xpathRelativo = By.xpath("//input[@id='user-name']");

        const elementoRelativo = await driver.findElement(xpathRelativo);

        console.log('XPath relativo encontrado:', await elementoRelativo.isDisplayed());

        // 4. XPath absoluto (ejemplo; reemplázalo por el tuyo)
        const xpathAbsoluto = By.xpath(
            "/html/body/div/div/div[2]/div[1]/div/div/form/div[1]/input"
        );

        const elementosAbsolutos = await driver.findElements(xpathAbsoluto);

        console.log('Elementos encontrados con XPath absoluto:', elementosAbsolutos.length);

        // 5. Validar selector relativo
        if (await elementoRelativo.isDisplayed()) {
            console.log('PASS: Campo Username visible con XPath relativo');
        } else {
            console.log('FAIL: Campo Username no visible');
        }

        // 6. Ingresar texto para demostrar interacción
        await elementoRelativo.sendKeys('standard_user');

        console.log('Texto ingresado correctamente.');

        // 7. Dejar Chrome abierto hasta presionar Enter
        await new Promise(resolve => {
            rl.question('Presiona ENTER para cerrar el navegador...', resolve);
        });

    } catch (error) {

        console.error('Error en la práctica:', error.message);

    } finally {

        rl.close();
        await driver.quit();

    }
}

practicaXPath();