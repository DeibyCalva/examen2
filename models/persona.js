'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema; //Esquemas que se crearan en la BDD mongoose
var PersonaSchema = Schema({
    id: mongoose.Schema.Types.ObjectId,
    externalId: String,
    cedula: String,
    apellidos: String,
    nombres: String
    
}, false); //Propiedades de la tabla se incluyen en el Schema

/*
 * Columna: Tipo de dato
 */

module.exports = mongoose.model("Persona", PersonaSchema); //Nombre de la tabla -> "Persona"