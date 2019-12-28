const express = require('express');
const router = express.Router();
const indexcontroller= require('../controllers/indexcontroller');
const passport=require('passport');
const {isAuthenticated }=require('../helpers/auth');
const Bici=require('../modelos/bikes');
const Estacion=require('../modelos/estacion');
const Point=require('../modelos/point');
const User=require('../modelos/usuario');
const RFID=require('../modelos/rfid');
const Viaje=require('../modelos/viaje');
const Viajeactual=require('../modelos/viajeactual');
const Alquiler=require('../modelos/alquiler');
const Zona=require('../modelos/zona');
const nodemailer=require('nodemailer');
/* GET home page. */
router.get('/', function(req, res) {
    res.render('home', { title: 'Express' });
});
router.get('/viajesuser', async function (req, res) {
    try {
        const viajes = await Viaje.find({});
        res.render('viajesuser', {viajes});
    } catch (error) {
    console.error(error);
    res.status(500).send('Oops..');
    }
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
    try{
        const puntos = await Point.find({}).lean();
        const bicis = await Bici.find({}).lean();
        res.render('administrar', {puntos,bicis});
    } catch (error) {
        console.error(error);
        res.status(500).send('Oops..');
    }
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
router.get('/updatealquileres', async function (req, res) {
    try {
        const alq= await Alquiler.find({}).lean();
        let alqjson = JSON.stringify(alq);
        res.send(alqjson);
    } catch (error) {
        console.error(error);
        res.status(500).send('Oops..');
    }
});
router.get('/updateviajes', async function (req, res) {
    try {
        const viaj= await Viaje.find({}).lean();
        let viajson = JSON.stringify(viaj);
        res.send(viajson);
    } catch (error) {
        console.error(error);
        res.status(500).send('Oops..');
    }
});
router.get('/updatezona', async function (req, res) {
    try {
        let zona= await Zona.findOne({nombre:'zona'}).lean();
        let datazona=[];
        let aux1=[zona.puntos[0].lat,zona.puntos[0].lon];
        datazona.push(aux1);
        let aux2=[zona.puntos[0].lat1,zona.puntos[0].lon1];
        datazona.push(aux2);
        let aux3=[zona.puntos[0].lat2,zona.puntos[0].lon2];
        datazona.push(aux3);
        let aux4=[zona.puntos[0].lat3,zona.puntos[0].lon3];
        datazona.push(aux4);
        res.send(datazona);
    } catch (error) {
        console.error(error);
        res.status(500).send('Oops..');
    }
});
router.get('/puntobici', async function (req, res) {
    try {
        const puntos= await Point.find({}).lean();
        let puntojson = JSON.stringify(puntos);
        res.send(puntojson);
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
        console.log(numero);
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
router.get('/btnviajes', async function (req, res) {
    try {
        const viaje = await Viaje.find({}).lean();
        res.render('btnviajes', {viaje});
    } catch (error) {
        console.error(error);
        res.status(500).send('Oops..');
    }
});
router.get('/btnalquileres', async function (req, res) {
    try {
        const alq = await Alquiler.find({}).lean();
        res.render('btnalquileres', {alq});
    } catch (error) {
        console.error(error);
        res.status(500).send('Oops..');
    }
});
router.get('/homeuser', function (req, res) {
});
router.get('/btnrutas', function (req, res) {
    res.render('btnrutas', { title: 'Express' });
});
router.get('/btnzona', function (req, res) {
    res.render('btnzona', { title: 'Express' });
});
router.get('/btnusuarios', async function (req, res) {
    try{
        const usuario = await User.find({}).lean();
        res.render('btnusuarios', {usuario});
    } catch (error) {
        console.error(error);
        res.status(500).send('Oops..');
    }
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
router.post('/addzona', indexcontroller.addzona );
router.post('/verpin', passport.authenticate('pin',{
    successRedirect:'/alquiler',
    failureRedirect:'/alquilar',
    failureFlash:true
}));
router.post('/crearalquiler', indexcontroller.alquilar);
router.post('/verviaje', indexcontroller.verviaje);
router.post('/auth', passport.authenticate('passport',{failureRedirect:'/signin', failureFlash:true}),
    async function (req, res) {
        try{
            const usuariot= await User.find({usuario:req.body.usuario});
            if (usuariot) {
                if (usuariot[0].tipo == 'estudiante') {
                    res.render('homeuser');
                } else if (usuariot[0].tipo == 'administrador') {
                    try {
                        const puntos = await Point.find({}).lean();
                        const bicis = await Bici.find({}).lean();
                        res.render('administrar', {puntos,bicis});
                    } catch (error) {
                        console.error(error);
                        res.status(500).send('Oops..');
                    }
                }
            }
        }catch (error) {
            console.error(error);
            res.status(500).send('Oops..');
        }
    }
);
setInterval(async function () {
    let puntos=await Point.find({}).lean();
    let zona= await Zona.findOne({nombre:'zona'}).lean();
    let datazona = [];
    let aux1 = [zona.puntos[0].lat, zona.puntos[0].lon];
    datazona.push(aux1);
    let aux2 = [zona.puntos[0].lat1, zona.puntos[0].lon1];
    datazona.push(aux2);
    let aux3 = [zona.puntos[0].lat2, zona.puntos[0].lon2];
    datazona.push(aux3);
    let aux4 = [zona.puntos[0].lat3, zona.puntos[0].lon3];
    datazona.push(aux4);
    for (var i=0; i<puntos.length; i++) {

        var result=inside(puntos[i].punto,datazona);
        updatebicicleta(result,puntos[i].patron_id);
    }
},4000);
function inside(point,vs) {
    var x = point[0];
    var y = point[1];
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0];
        var yi = vs[i][1];
        var xj = vs[j][0];
        var yj = vs[j][1];
        var intersect = (((yi > y) != (yj > y)) && (x < ((xj - xi) * (y - yi) / (yj - yi) + xi)));
        if (intersect) inside = !inside;
    }
    return inside;
};
async function updatebicicleta(result,id) {
    var nombre=id;
    if (result == false) {
           const bici=await Bici.findOne({ident:nombre});
           var estadopasado=bici.zonapasada;
           var estadoactual=bici.zonaactual;
           // console.log('El estado actual '+estadoactual);
           // console.log('El estado pasado '+estadopasado);

            if((estadopasado===' ')&&(estadoactual===' ')){
              const n=await Bici.findOneAndUpdate({ident:nombre},{zona:'Fuera de zona',zonapasada:'no',zonaactual:'fuera'});
              n.save();
              exports.sendEmail();
            }
            else if((estadopasado=='no')&&(estadoactual=='fuera')){
               const n=await Bici.findOneAndUpdate({ident:nombre},{zona: 'Fuera de zona',zonapasada:estadoactual,zonaactual:'fuera'});
               n.save();
            }
            else if ((estadopasado=='fuera')&&(estadoactual=='fuera')){
                const n=await Bici.findOneAndUpdate({ident:nombre},{zona: 'Fuera de zona',zonapasada:estadoactual,zonaactual:'fuera'});
                n.save();
            }
            else if ((estadopasado=='dentro')&&(estadoactual=='dentro')){
                const n=await Bici.findOneAndUpdate({ident:nombre},{zona: 'Fuera de zona',zonapasada:estadoactual,zonaactual:'fuera'});
                n.save();
            }
            else if((estadopasado=='dentro')&&(estadoactual=='fuera')){
                const n=await Bici.findOneAndUpdate({ident:nombre},{zona: 'Fuera de zona',zonapasada:estadoactual,zonaactual:'fuera'});
                n.save();
                exports.sendEmail();
            }
            else if((estadopasado=='fuera')&&(estadoactual=='dentro')){
                const n=await Bici.findOneAndUpdate({ident:nombre},{zona: 'Fuera de zona',zonapasada:estadoactual,zonaactual:'fuera'});
                n.save();
                exports.sendEmail();
            }
    }
    else if(result==true){
            const bici=await Bici.findOne({ident:nombre});
            var estadopasado=bici.zonapasada;
            var estadoactual=bici.zonaactual;
            // console.log('El estado actual '+estadoactual);
            // console.log('El estado pasado '+estadopasado);
            if((estadopasado==' ')&&(estadoactual==' ')){
                const n=await Bici.findOneAndUpdate({ident:nombre},{zona: 'Dentro de zona',zonapasada:'no',zonaactual:'dentro'});
                n.save();
                exports.sendEmail();
            }
            else if((estadopasado=='no')&&(estadoactual=='dentro')){
               const n=await Bici.findOneAndUpdate({ident:nombre},{zona: 'Dentro de zona',zonapasada:estadoactual,zonaactual:'dentro'});
               n.save();
            }
            else if ((estadopasado=='dentro')&&(estadoactual=='dentro')){
                const n=await Bici.findOneAndUpdate({ident:nombre},{zona: 'Dentro de zona',zonapasada:estadoactual,zonaactual:'dentro'});
                n.save();
            }
            else if ((estadopasado=='fuera')&&(estadoactual=='dentro')){
                const n=await Bici.findOneAndUpdate({ident:nombre},{zona: 'Dentro de zona',zonapasada:estadoactual,zonaactual:'dentro'});
                n.save();
                exports.sendEmail();
            }
            else if ((estadopasado=='fuera')&&(estadoactual=='fuera')){
                const n=await Bici.findOneAndUpdate({ident:nombre},{zona: 'Dentro de zona',zonapasada:estadoactual,zonaactual:'dentro'});
                n.save();
            }
            else if ((estadopasado=='dentro')&&(estadoactual=='fuera')){
                const n=await Bici.findOneAndUpdate({ident:nombre},{zona: 'Dentro de zona',zonapasada:estadoactual,zonaactual:'dentro'});
                n.save();
                exports.sendEmail();
            }
    }
};
exports.sendEmail = async function (req, res) {
    let admin = await User.find({tipo: 'administrador'});
    let administradores = [];
    for (var i=0;i<admin.length;i++) {
        let aux1 = [admin[i].correo,];
        administradores.push(aux1);
    }
    // console.log(administradores);
    var transporter = nodemailer.createTransport({
        service: 'Hotmail',
        auth: {
            user: 'sistemasaabi@hotmail.com',
            pass: 'Sistema1234'
        }
    });
    var mailOptions = {
        from: 'sistemasaabi@hotmail.com',
        to: administradores,
        subject: 'ALERTA: Bicicleta fuera de Zona',
        text: 'Se ha detectado que la bicicleta ... está fuera de la Zona establecida'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(500, err.message);
        } else {
            console.log("Email sent");
            res.status(200).jsonp(req.body);
        }
    });
};
module.exports = router;