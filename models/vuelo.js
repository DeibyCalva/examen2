'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var VueloSchema = Schema({
    id: mongoose.Schema.Types.ObjectId,
    externalId: String,
    fecha: String,
    pais: String,
    subtotal: Number,
    iva: Number,
    total: Number,
    descuento: Number,
    persona: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Persona"
    },
    estado: {type: Boolean, default: true}

}, false);

module.exports = mongoose.model("Venta", VueloSchema);