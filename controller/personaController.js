'use strict';
const uuidv4 = require('uuid/v4');
var mongoose = require('mongoose');
var Persona = require('../models/persona');

class PersonaController {

    //Ver registro de personas
    verRegistro(req, res) {
        res.render('index', {title: 'Registro de cliente', fragmento: 'fragmentos/frmRegistro'});
    }

    //Registrar personas
    guardar(req, res) {
        Persona.findOne({cedula: req.body.cedula}, (error, persona) => {
            //Error en caso de problemas
            if (error) {
                //Utilizacion de alertas mediante el flash
                //req.flash requiere 2 parámetros, el primero es la variable del mensaje y el segundo es el texto que se mostrara.  
                req.flash('info', 'Hubo un error', false);
                res.redirect('/registro/persona');
            } else if (persona) {
                req.flash('info', 'Cedula ya existe', false);
                res.redirect('/registro/persona');
            } else {
                new Persona({
                    id: new mongoose.Types.ObjectId(),
                    cedula: req.body.cedula,
                    apellidos: req.body.apellidos,
                    nombres: req.body.nombres,
                    externalId: uuidv4()
                }).save(function (err, newPersona) {
                    if (err) {
                        req.flash('info', 'Hubo un error en guardado', false);
                    } else if (newPersona) {
                        req.flash('info', 'Se ha registrado correctamente', false);
                    }
                    res.redirect('/registro/persona');
                });

            }

        });
    }
}
module.exports = PersonaController;