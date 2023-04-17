const pedidoService = require("../service/pedido.service");
const ProdutoService = require("../service/produto.service");

const findPedidoByIdController = async (req, res) => {
    try{
        const pedido = await pedidoService.findPedidoByIdService(req.params.id)

        if (!pedido){
            return res.status(404).send({message: `Pedido especificado não encontrado!`});
        }
        return res.status(200).send(pedido);

    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
}


const findAllPedidosController = async (req, res) => {
    try{
        const pedidos = await pedidoService.findAllPedidosService(req.query.limit, req.query.offset);

        if (pedidos.length == 0){
            return res.status(404).send({message: `Não há Pedidos cadastrados na base!`});
        }else{
            return res.status(200).send(pedidos);
        }

    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
}


const createPedidoController = async (req, res) => {
    try{
        let erros = [];  //var para acumular os erros
        
        //verifica se os produtos passados no body existem na base, iterando individualmente
        await Promise.all(req.body.produtos.map( async (value, key) => {
            let produto = await ProdutoService.findProductByIdServices(value._id);
            if (!produto){
                erros.push(`'${key+1} - _id - Produto inexistente! '`); 
            }
        }));

        if(erros.length != 0){
            if(erros.length == 1){
                return res.status(400).send({message: `O campo ${erros} precisa ser preenchido corretamente!`});
            }else{
                return res.status(400).send({message: `Os campos ${erros} precisam ser preenchidos corretamente!`});
            }
        }

        //adiciona o Id do user logado no body e repassa pra criar o pedido
        const corpo = {  
            ...req.body,  
            userId: req.userId
        }

        return res.status(201).send(await pedidoService.createPedidoService(corpo));

    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
}


const deletePedidoController = async (req, res) => {
    try{
        //verifica se o Pedido existe
        const pedido = await pedidoService.findPedidoByIdService(req.params.id);

        if (!pedido){
            return res.status(400).send({message: `Pedido especificado não encontrado!`});
        }

        const deletedPedido = await pedidoService.deletePedidoService(req.params.id)

        if (deletedPedido == null){
            return res.status(400).send({message: `Não foi possivel remover pedido!`});
        }else{
            return res.status(200).send({message: `Pedido deletado com sucesso`});
        }

    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
}


const updateStatusPedidoController = async (req, res) => {
    try{
        let pedido = await pedidoService.findPedidoByIdService(req.params.id);
        //verifica se existe o pedido a ser concluído
        if (!pedido){
            return res.status(400).send({message: `Pedido não encontrado!`});
        }
        //se existir, checa se já foi concluído anteriormente
        if (pedido.concluido){
            return res.status(400).send({message: `Este Pedido já foi concluído e não aceita mais alterações!`});
        }
        //faz a alteração do status do campo concluído.
        statusPedido = await pedidoService.updateStatusPedidoService(req.params.id);
        //faz busca pelo pedido e checa status após modificação. 
        statusPedido = await pedidoService.findPedidoByIdService(req.params.id);
        if (!statusPedido.concluido){
            return res.status(400).send({message: `Não foi possível concluir o Pedido!`});
        }else{
            return res.status(200).send({message: `Pedido Concluído com sucesso!`});
        }

    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
}


module.exports = {
    findPedidoByIdController,
    findAllPedidosController,
    createPedidoController,
    deletePedidoController,
    updateStatusPedidoController
}