const { Builder, By } = require('selenium-webdriver');

async function probarNGNIX() {
    const driver = await new Builder()
        .forBrowser('chrome')
        .build();

    try {
        // Abrir el sistema
        await driver.get('http://192.168.1.43/');

        // Mostrar título
        const titulo = await driver.getTitle();
        console.log('Título del sistema:', titulo);

        // Obtener URL actual
        const url = await driver.getCurrentUrl();
        console.log('URL:', url);

        console.log('Prueba ejecutada correctamente');

    } finally {
        await driver.quit();
    }
}

probarNGNIX();