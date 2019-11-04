const express = require('express');
const router = express.Router();
const indexcontroller= require('../controllers/indexcontroller');
const passport=require('passport');
const {isAuthenticated }=require('../helpers/auth');
const Bici=require('../modelos/bikes');
const Point=require('../modelos/point');

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
router.get('/administrar', async function (req, res) {
    const puntos = await Point.find({}).lean();
    const bicis = await Bici.find({}).lean();
    res.render('administrar', {puntos,bicis});
});
router.get('/login', function(req, res) {
  res.render('usuarios', { title: 'Express' });
});
router.get('/btnbici', async function (req, res) {
    try {
        const bicis = await Bici.find({}).lean();
        const puntos = await Point.find({}).lean();
        console.log(bicis);
        console.log(puntos);
        res.render('btnbici', {bicis, puntos});
    } catch (error) {
        console.error(error);
        res.status(500).send('Oops..');
    }
});
router.get('/btnestac', function (req, res) {
    res.render('btnestac', { title: 'Express' });
});
router.get('/btnviajes', function (req, res) {
    res.render('btnviajes', { title: 'Express' });
});
router.get('/btnrutas', function (req, res) {
    res.render('btnrutas', { title: 'Express' });
});
router.get('/btnusuarios', function (req, res) {
    res.render('btnusuarios', { title: 'Express' });
});

router.get('/logout', isAuthenticated, function(req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out now.');
    res.redirect('/signin');
});

router.get('/alquiler', isAuthenticated, function (req, res) {
    res.render('alquiler', { title: 'Express' });
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
//router.post('/verpin', indexcontroller.pin);

//router.post('/creandoalquiler', indexcontroller.add );
//router.post('/verpin', indexcontroller.pin);

router.post('/addbici', indexcontroller.addbici );

router.post('/verpin', passport.authenticate('pin',{
    successRedirect:'/alquiler',
    failureRedirect:'/alquilar',
    failureFlash:true
}));

router.post('/crearalquiler', indexcontroller.alquilar);

router.post('/auth', passport.authenticate('passport',{
    successRedirect:'/administrar',
    failureRedirect:'/signin',
    failureFlash:true
}));

module.exports = router;

