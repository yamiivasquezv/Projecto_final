const express = require('express');
const router = express.Router();
const indexcontroller= require('../controllers/indexcontroller');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('home', { title: 'Express' });
});
router.get('/home', function(req, res) {
  res.render('home', { title: 'Express' });
});
router.get('/signin', function(req, res) {
    res.render('login', { title: 'Express' });
});
router.get('/alquilar', function (req, res) {
    res.render('pin', { title: 'Express' });
});
router.get('/login', function(req, res) {
  res.render('usuarios', { title: 'Express' });
});
router.get('/administrador', function (req, res) {
    if (req.session.loggedin) {
        res.render('administrador');
    } else {
        res.send('Please login to view this page!');
    }
    res.end();
});
router.post('/add', indexcontroller.add );
router.post('/verpin', indexcontroller.pin);
router.put('/crearalquiler/:id', indexcontroller.alquilar);
router.post('/auth', indexcontroller.auth);
module.exports = router;

