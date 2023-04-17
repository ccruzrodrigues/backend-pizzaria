const mongoose = require("mongoose");


const CategoriaSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    descricao: {type: String},
    createdAt: {type: Date, required: true, default: Date.now() - 3*60*60*1000}
});


const Categoria = mongoose.model("categoria", CategoriaSchema);

module.exports = Categoria;

