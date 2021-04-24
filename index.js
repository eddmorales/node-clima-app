require('dotenv').config();

const { leerInput, inquirerMenu, inquirerPausa, listadoLugares } = require('./helpers/inquirer');
const Busqueda = require('./models/busqueda');

const main = async() => {

    const busqueda = new Busqueda();
    let opt;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // mostrar mensaje
                const lugar = await leerInput('Ciudad: ');

                // buscar los lugares
                const lugares = await busqueda.ciudad(lugar);

                // seleccionar el lugar
                const id = await listadoLugares(lugares);
                if (id === '0') continue;

                const lugarSeleccionado = lugares.find(lugar => lugar.id === id);
                busqueda.agregarHistorial(lugarSeleccionado.nombre);

                const { nombre, longitud, latitud } = lugarSeleccionado;

                // datos del clima
                const clima = await busqueda.climaLugar(latitud, longitud);
                const { descripcion, temp, min, max } = clima;

                // mostrar resultados
                console.clear();
                console.log('\nInformación del lugar\n'.green);
                console.log('Ciudad: ', nombre.green);
                console.log('Latitud: ', latitud);
                console.log('Longitud: ', longitud);
                console.log('Descripción: ', descripcion.green);
                console.log('Temperatura: ', temp);
                console.log('Mínima: ', min);
                console.log('Máxima: ', max);

                break;

            case 2:
                busqueda.historialCapitalizado.forEach((lugar, i) => {
                    const indice = `${i + 1}.`.green;
                    console.log(`${indice} ${lugar}`);
                })

                break;
        }

        if (opt !== 0) await inquirerPausa();

    } while (opt !== 0)
}

main();