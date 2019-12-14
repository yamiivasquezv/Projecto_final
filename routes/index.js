const express = require('express');
const router = express.Router();
const indexcontroller= require('../controllers/indexcontroller');
const passport=require('passport');
const {isAuthenticated }=require('../helpers/auth');
const Bici=require('../modelos/bikes');
const Estacion=require('../modelos/estacion');
const Point=require('../modelos/point');
const User=require('../modelos/usuario');
const RFID=require('../modelos/rfid')
const Viaje=require('../modelos/viaje');
const Viajeactual=require('../modelos/viajeactual');
/* GET home page. */
router.get('/', function(req, res) {
    res.render('home', { title: 'Express' });
});
router.get('/viajesuser', async function (req, res) {
    const viajes=await Viaje.find({});
    res.render('viajesuser', {viajes});
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
        const rfid= await RFID.find({}).lean();
        const bicis = await Bici.find({}).lean();
        const puntos = await Point.find({}).lean();
        res.render('btnbici', {bicis, puntos, rfid});
    } catch (error) {
        console.error(error);
        res.status(500).send('Oops..');
    }
});
router.get('/updatebicicletas', async function (req, res) {
    try {
        const bikes = await Bici.find({}).lean();
        let bikejson = JSON.stringify(bikes);
        res.send(bikejson);
    } catch (error) {
        console.error(error);
        res.status(500).send('Oops..');
    }
});
router.get('/ubicacion', async function (req, res) {
    try {
        const ident=req.query.biciubi;
        const puntos= await Point.find({patron_id: ident}).lean();
        let puntojson = JSON.stringify(puntos);
        res.send(puntojson);
    } catch (error) {
        console.error(error);
        res.status(500).send('Oops..');
    }
});
router.get('/viaje', async function (req, res) {
    try {
        const numero=req.query.viajee;
        const us=req.query.log;
        let viaje= await Viajeactual.find({$and:[{viaje:numero},{usuario:us}]}).lean();
        let datalanlon=[];

        for (var i=0; i<viaje[0].puntos.length;i++){
            let aux=[viaje[0].puntos[i].lat,viaje[0].puntos[i].lon];
            datalanlon.push(aux);
        }
        res.send(datalanlon);
    } catch (error) {
        console.error(error);
        res.status(500).send('Oops..');
    }
});
router.get('/btnestac', async function (req, res) {
    try {
        const estacion = await Estacion.find({}).lean();
        res.render('btnestac', {estacion});
    } catch (error) {
        console.error(error);
        res.status(500).send('Oops..');
    }
});
router.get('/btnviajes', function (req, res) {
    res.render('btnviajes', { title: 'Express' });
});
router.get('/homeuser', function (req, res) {
});
router.get('/btnrutas', function (req, res) {
    res.render('btnrutas', { title: 'Express' });
});
router.get('/btnusuarios', async function (req, res) {
    const usuario = await User.find({}).lean();
    res.render('btnusuarios', {usuario});
});
router.get('/logout', isAuthenticated, function(req, res) {
    req.logout();
    req.flash('success_msg', 'Has Cerrado Sesión Satisfactoriamente');
    res.redirect('/signin');
});
router.get('/alquiler', isAuthenticated, function (req, res) {
    res.render('alquiler', { title: 'Express' });
});
router.get('/administrador', function (req, res) {
    if (req.session.loggedin) {
        res.render('administrador');
    } else {
        res.send('Inicia sesión para poder ver esta página!');
    }
    res.end();
});
router.post('/add', indexcontroller.add );
router.post('/verubi', indexcontroller.verubi);
router.post('/addbici', indexcontroller.addbici );
router.post('/addestac', indexcontroller.addestac );
router.post('/verpin', passport.authenticate('pin',{
    successRedirect:'/alquiler',
    failureRedirect:'/alquilar',
    failureFlash:true
}));
router.post('/crearalquiler', indexcontroller.alquilar);
router.post('/verviaje', indexcontroller.verviaje);
router.post('/auth', passport.authenticate('passport',{failureRedirect:'/signin', failureFlash:true}),
    async function (req, res) {
        const usuariot= await User.find({usuario:req.body.usuario});
        if (usuariot) {
            if (usuariot[0].tipo == 'estudiante') {
                res.render('homeuser');
            } else if (usuariot[0].tipo == 'empleado') {
                const puntos = await Point.find({}).lean();
                const bicis = await Bici.find({}).lean();
                res.render('administrar', {puntos,bicis});
            }
        }
    }
);
module.exports = router;

