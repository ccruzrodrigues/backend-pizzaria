const Pedido = require("../model/Pedido");


const findPedidoByIdService = (id) => {
    return Pedido.findById(id);
}


const findAllPedidosService = (limit, offset) => {
    return Pedido.find().limit(limit).skip(offset);
}


// verificar se precisa do ID, q tá sendo passado no Controller
const createPedidoService = (body) => {
    return Pedido.create(body);
}


const deletePedidoService = (id) => {
    return Pedido.findByIdAndRemove(id);
}


const updateStatusPedidoService = (id) => {
    return Pedido.findOneAndUpdate(
        {
            _id:id
        },
        {
            $set: { concluido: true } 
        }
    );
}

module.exports = {
    findPedidoByIdService,
    findAllPedidosService,
    createPedidoService,
    deletePedidoService,
    updateStatusPedidoService
}