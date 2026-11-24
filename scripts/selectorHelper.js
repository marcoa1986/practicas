
const { By, until } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');

// 1. Crear carpeta y archivo de registros
const carpetaLogs = path.join(__dirname, 'logs');
const archivoLog = path.join(carpetaLogs, 'selectores.jsonl');

fs.mkdirSync(carpetaLogs, { recursive: true });

// 2. Función principal de búsqueda
async function buscarElemento(driver, selectores, tiempo = 2000) {

    // Recorrer selectores en orden de prioridad
    for (const selector of selectores) {

        const inicio = Date.now();
        let cantidadEncontrada = 0;
        let motivo = '';

        try {

            // 3. Esperar y validar el elemento
            const elemento = await driver.wait(async () => {

                const elementos = await driver.findElements(
                    selector.localizador
                );

                cantidadEncontrada = elementos.length;

                // 4. Validar unicidad
                if (elementos.length !== 1) {

                    motivo = elementos.length === 0
                        ? 'No encontrado'
                        : `Ambiguo: ${elementos.length} elementos`;

                    return false;
                }

                // 5. Validar visibilidad
                const visible = await elementos[0].isDisplayed();

                if (!visible) {
                    motivo = 'Elemento no visible';
                    return false;
                }

                // 6. Validar habilitación
                const habilitado = await elementos[0].isEnabled();

                if (!habilitado) {
                    motivo = 'Elemento deshabilitado';
                    return false;
                }

                return elementos[0];

            }, tiempo);

            // 7. Registrar selector exitoso
            const registro = {
                fecha: new Date().toISOString(),
                selector: selector.nombre,
                localizador: String(selector.localizador),
                encontrados: cantidadEncontrada,
                unico: true,
                estado: 'UTILIZADO',
                duracionMs: Date.now() - inicio
            };

            fs.appendFileSync(
                archivoLog,
                JSON.stringify(registro) + '\n'
            );

            console.log(
                `Selector utilizado: ${selector.nombre} | ` +
                `Encontrados: ${cantidadEncontrada} | Único: SI`
            );

            return elemento;

        } catch (error) {

            // 8. Registrar selector rechazado
            const registro = {
                fecha: new Date().toISOString(),
                selector: selector.nombre,
                localizador: String(selector.localizador),
                encontrados: cantidadEncontrada,
                unico: false,
                estado: 'RECHAZADO',
                motivo: motivo || error.message,
                duracionMs: Date.now() - inicio
            };

            fs.appendFileSync(
                archivoLog,
                JSON.stringify(registro) + '\n'
            );

            console.log(
                `Selector rechazado: ${selector.nombre} | ${registro.motivo}`
            );
        }
    }

    // 9. Si todos los selectores fallan, lanzar error
    throw new Error(
        'No se encontró un elemento único, visible y habilitado.'
    );
}

module.exports = buscarElemento;
