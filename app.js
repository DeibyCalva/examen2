var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Direccion de todos los recursos de la app web
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var session = require('express-session');
var flash = require('express-flash-notification');

var app = express();


var cors = require('cors');

app.use(cors());

/*
 * Conección de Mongoose
 */

//Configuracion de mongoose
var db, db_adress, mongoose;
mongoose = require('mongoose');
db_adress = "127.0.0.1:27017/vueloExamen";

mongoose.connection.on("open", function (ref) {
    return console.log("Se conecto el servidor");
});

mongoose.connection.on("error", function (err) {
    return console.log("No se conecto el servidor: " + err);
});

try {
    mongoose.connect("mongodb://" + db_adress, {useNewUrlParser: true});
    db = mongoose.conection;
    console.log("Servidor levantado");
} catch (e) {
    console.log("No se ha podido levantar el servidor");
}
//Fin

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
    secret: 'Cuarto A',
    resave: true,
    saveUninitialized: true
}));

app.use(flash(app));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
