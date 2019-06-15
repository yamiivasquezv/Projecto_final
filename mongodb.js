const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/proyecto',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db=> console.log('Mongo is connected'))
.catch(err=> console.error(err));