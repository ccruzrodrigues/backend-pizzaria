const mongoose = require("mongoose");


const PedidoSchema = new mongoose.Schema({
    produtos: [
        {
            _id: {type: mongoose.Schema.Types.ObjectId, required: true, ref:"produtos"},
            quantidade: {type: Number, required: true}
        }
    ],
    precoTotal: {type: Number, required: true},
    frete: {type: Number, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref:"usuarios"},
    createdAt: {type: Date, required: true, default: Date.now() - 3*60*60*1000},
    concluido: {type: Boolean, required: true}
});


const Pedido = mongoose.model("pedido", PedidoSchema);

module.exports = Pedido;