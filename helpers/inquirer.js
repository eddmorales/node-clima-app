const inquirer = require('inquirer');
require('colors');

const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: '¿Qué deseas hacer?',
    choices: [{
            value: 1,
            name: `${'1.'.green} Buscar ciudad`
        },
        {
            value: 2,
            name: `${'2.'.green} Historial`
        },
        {
            value: 0,
            name: `${'3.'.green} Salir`
        }
    ]
}];


const inquirerMenu = async() => {

    console.clear();

    console.log('============================'.green);
    console.log('  Seleccione una opción'.green);
    console.log('============================'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const inquirerPausa = async() => {

    const pregunta = [{
        type: 'input',
        name: 'enter',
        message: `Presione ${'ENTER'.green} para continuar`
    }]

    await inquirer.prompt(pregunta);


}

const leerInput = async(message) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Por favor ingresa un valor';
            }
            return true;
        }
    }];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listadoLugares = async(lugares = []) => {

    const choices = lugares.map((lugar, i) => {
        const indice = `${i + 1}`.green;

        return {
            value: lugar.id,
            name: `${indice} ${lugar.nombre}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' cancelar'
    });

    const preguntas = [{
        type: 'list',
        name: 'id',
        message: 'Seleccionar lugar: ',
        choices
    }]

    const { id } = await inquirer.prompt(preguntas);

    return id;
}

const confirmar = async(message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList = async(tareas) => {
    const choices = tareas.map((tarea, i) => {
        const indice = `${i + 1}`.green;

        return {
            value: tarea.id,
            name: `${indice} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Selecciones',
        choices
    }]

    const { ids } = await inquirer.prompt(pregunta);

    return ids;
}


module.exports = {
    inquirerMenu,
    inquirerPausa,
    leerInput,
    listadoLugares,
    confirmar,
    mostrarListadoCheckList
}