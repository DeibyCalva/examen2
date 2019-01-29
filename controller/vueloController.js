'use strict';
var mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
//Para listar a los clientes
var Persona = require('../models/persona');
//Administrar de vuelos
var Vuelo = require('../models/vuelo');
//Recorrer listas
var forEach = require('sync-each');

class VueloController {
    verRegistro(req, res) {
        Persona.find({}, (err, personas) => {
            if (personas) {
                var listaF = [];
                Vuelo.find({}, (error, vuelos) => {
                    if (vuelos) {
                        //No es necesario
                        
                        forEach(vuelos,
                                function (vuelo, next) {
                                    Persona.findOne({id: vuelo.persona}, (err, per) => {
                                        if (per) {
                                            vuelo.datosPersona = per.apellidos + " " + per.nombres;
                                            listaF.push(vuelo);
                                            next(err, listaF);
                                        }
                                    });
                                }, function (err, listaF) {
                            res.render('index', {title: 'Registro de vuelos',
                                fragmento: 'fragmentos/frmRegistroVuelos',
                                lista: personas,
                                listaF: listaF
                            });
                        });


                    }
                });
            }
        });
    }

    guardar(req, res) {
        console.log(req.body.external);
        if (req.body.external == 0) {
            Vuelo.findOne({pais: req.body.nro}, (error, vuelo) => {
                if (error) {
                    req.flash('info', 'Hubo un error', false);
                    res.redirect('/registro/vuelo');
                } else if (vuelo) {
                    req.flash('info', 'Vuelo ya existe', false);
                    res.redirect('/registro/vuelo');
                } else {
                    new Vuelo({
                        id: new mongoose.Types.ObjectId(),
                        fecha: req.body.fecha,
                        pais: req.body.pais,
                        subtotal: req.body.subtotal,
                        iva: req.body.iva,
                        total: req.body.total,
                        descuento: req.body.descuento,
                        externalId: uuidv4(),
                        persona: req.body.clientes
                    }).save(function (err, newVuelo) {
                        if (err) {
                            req.flash('info', 'Hubo un error en guardado', false);
                        } else if (newVuelo) {
                            req.flash('info', 'Se ha registrado correctamente', false);
                        }
                        res.redirect('/registro/vuelo');
                    });

                }

            });
        } else {
            //modifcar
            console.log("Modificar");
            Vuelo.update({externalId: req.body.external}, {$set: {
                    fecha: req.body.fecha,
                    pais: req.body.pais,
                    subtotal: req.body.subtotal,
                    iva: req.body.iva,
                    total: req.body.total,
                    descuento: req.body.descuento,
                    persona: req.body.clientes
                }}, (err, vuelo) => {
                if (err) {
                    req.flash('info', 'Hubo un error en modificado', false);
                } else if (vuelo) {
                    req.flash('info', 'Se ha modificado correctamente', false);
                }
                res.redirect('/registro/vuelo');
            });
        }
    }

}
module.exports = VueloController;

