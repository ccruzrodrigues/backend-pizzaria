
const mongoose = require('mongoose');

function connectToDatabase(){
    mongoose.connect(process.env.URLDATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then( () => {
        console.log('Mongo DB Conectado!');    
    }).catch( (err) => {
        return console.log(`Erro na Conexão com o Banco: ${err}`)
    })

}

module.exports = connectToDatabase;