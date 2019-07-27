const express = require('express');
const router = express.Router();
const indexcontroller= require('../controllers/indexcontroller');
const passport=require('passport');
const {isAuthenticated }=require('../helpers/auth');

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


router.post('/verpin', passport.authenticate('pin',{
    successRedirect:'/alquiler',
    failureRedirect:'/alquilar',
    failureFlash:true
}));


router.put('/crearalquiler/:id', indexcontroller.alquilar);

router.post('/auth', passport.authenticate('passport',{
    successRedirect:'/home',
    failureRedirect:'/signin',
    failureFlash:true
}));

module.exports = router;

