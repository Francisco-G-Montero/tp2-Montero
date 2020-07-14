const express = require("express");
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
var path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var token = '';
app.listen(80, () => {
});

app.get('/', function(req, res) {
    axios.post('http://strapi:1337/auth/local', {
            identifier: 'api-user@example.com',
            password: '123456'
        })
        .then(response => {
            token = response.data.jwt;

            res.sendFile(path.join(__dirname + '/index.html'));
        })
        .catch(error => {
            res.send('Error al obtener el token. Intente nuevamente.');
        });
});

app.get('/app.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/app.js'));
});

app.get('/carreras', function(req, res) {
    axios.get('http://strapi:1337/carreras', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            console.log(error);
        });
});
app.post('/carreras', function(req, res) {
    let data = {
        nombre: req.body.nombre
    };

    axios.post('http://strapi:1337/carreras', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            res.send(response.data);
        });
});
app.delete('/carreras/:id', function(req, res) {
    axios.delete('http://strapi:1337/carreras/' + req.params.id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            res.send(response.data);
        });
});

app.get('/materias', function(req, res) {
    axios.get('http://strapi:1337/materias', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            console.log(error);
        });
});
app.post('/materias', function(req, res) {
    let data = {
        nombre: req.body.nombre,
        carrera: req.body.carrera
    };

    axios.post('http://strapi:1337/materias', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            res.send(response.data);
        });
});
app.put('/materias/:id', function(req, res) {
    let data = {
        alumnos: req.body.alumnos
    };
    axios.put('http://strapi:1337/materias/' + req.params.id, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            res.send(response.data);
        });
});
app.delete('/materias/:id', function(req, res) {
    axios.delete('http://strapi:1337/materias/' + req.params.id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            console.log(error);
        });
});

app.get('/alumnos', function(req, res) {
    axios.get('http://strapi:1337/alumnos', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            console.log(error);
        });
});
app.post('/alumnos', function(req, res) {
    let data = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        legajo: req.body.legajo
    };

    axios.post('http://strapi:1337/alumnos', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            res.send(response.data);
        });
});
app.delete('/alumnos/:id', function(req, res) {
    axios.delete('http://strapi:1337/alumnos/' + req.params.id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            res.send(response.data);
        });
});