const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const UsuarioSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    senha: {type: String, required: true}, 
    imagem: {type: String, required: true},
    enderecos: [
        {
            logradouro: {type: String, required: true},
            numero: {type: Number, required: true},
            complemento: {type: String},
            cep: {type: String, required: true},
            createdAt: {type: Date, required: true, default: Date.now() - 3*60*60*1000}
        }
    ],
    produtos_fav: [
        {
            _id: {type: mongoose.Types.ObjectId, required: true, ref: "produtos"},
            createdAt: {type: Date, default: Date.now() - 3*60*60*1000}
        }
    ],
    admin: {type: Boolean, required: true, default: false},
    createdAt: {type: Date, required: true, default: Date.now() - 3*60*60*1000}
});


UsuarioSchema.pre("save", async function(next){
    if(this.senha){
        this.senha = await bcrypt.hash(this.senha, 10);
    }
    next();
});


UsuarioSchema.pre("findOneAndUpdate", async function(next){
    if(this._update.senha){
        this._update.senha = await bcrypt.hash(this._update.senha, 10);
    }
    next();
});


const Usuario = mongoose.model("usuarios", UsuarioSchema);

module.exports = Usuario;