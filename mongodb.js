const mongoose= require('mongoose');
// mongoose.connect('mongodb://localhost/proyecto',{
mongoose.connect('mongodb+srv://proyectobicicleta:proyectobicicleta@proyecto-5lgax.mongodb.net/bicicletas?retryWrites=true&w=majority',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db=> console.log('Mongo is connected'))
.catch(err=> console.error(err));