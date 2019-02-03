const express = require('express'),
    app = express(),
    morgan = require('morgan'),
    config = require('config'),
    Joi = require('joi'),
    debug = require('debug')('app:sturtUp'),
    dbDebug = require('debug')('app:DataBase')

app.use(express.json()); // request.body
app.use(express.urlencoded({ extended: true })); // key=value & key=value & key=value  // extende:true for not deprecated complex array
app.use(express.static('public')); // read a file static for folder pbulic

const courses = require('./routes/courses')
app.use('/courses',courses);



console.log(`the name project is ${config.get('name')}`);
console.log(`the email server is ${config.get('mail.host')}`);
//console.log(`the password project is ${config.get('mail.password')}`);

console.log(process.env.NODE_ENV);
console.log(app.get('env'))

if (app.get('env') === 'development') {
    app.use(morgan('short'));
    console.log('Development Enable')
} else if (app.get('env') === 'production') {
    app.use(morgan("short"))
    console.log('Production Enable')
}


debug('startUp Mode');
dbDebug('DataBase Mode');


let port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`The server running is port : ${port}`)
});
