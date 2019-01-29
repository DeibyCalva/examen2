var express = require('express');
var router = express.Router();
var persona = require('../controller/personaController');
var Persona = new persona();
var vuelo = require('../controller/vueloController');
var Vuelo = new vuelo();
/* GET home page. */
//router.get('/', function (req, res, next) {
//    res.render('index', {title: 'Facturación'});
//});

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Vuelo pasajeros', fragmento: 'fragmentos/principal'});
});

router.get('/clientes', function (req, res, next) {
    res.render('index', {title: 'Vuelo pasajeros', fragmento: 'fragmentos/frmRegistro'});
});

router.get('/vuelo', function (req, res, next) {
    res.render('index', {title: 'Vuelo pasajeros', fragmento: 'fragmentos/frmRegistroVuelos'});
});
//Persona
router.get('/registro/persona', Persona.verRegistro);
router.post('/registro/persona/guardar', Persona.guardar);

//Vuelo
router.get('/registro/vuelo', Vuelo.verRegistro);
router.post('/registro/vuelo/guardar', Vuelo.guardar);


module.exports = router;
