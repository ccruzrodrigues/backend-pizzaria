const carrinhoService = require("../service/carrinho.service");
const ProdutoService = require("../service/produto.service");


const findCarrinhoByIdController = async (req, res) => {
    try{
        const carrinho = await carrinhoService.findCarrinhoByIdService(req.params.id);

        if (!carrinho){
            return res.status(404).send({message: `Carrinho especificado não encontrado!`});
        }
        return res.status(200).send(carrinho);

    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
}


const findAllCarrinhosController = async (req, res) => {
    try{
        const carrinhos = await carrinhoService.findAllCarrinhosService(req.query.limit, req.query.offset);

        if (carrinhos.length == 0){
            return res.status(404).send({message: `Não há Carrinhos cadastrados na base!`});
        }else{
            return res.status(200).send(carrinhos);
        }

    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
}


const createCarrinhoController = async (req, res) => {

    try{
        let erros = [];  //var para acumular os erros
        
        //verifica se os produtos informados no body existem na base, iterando individualmente nos mesmos.
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

        //cria o carrinho com os itens informados e devolve o objeto
        return res.status(201).send(await carrinhoService.createCarrinhoService(corpo));

    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
}


const updateCarrinhoController = async (req, res) => {
    try{
        //verifica se o Carrinho existe no sistema
        const carrinho = await carrinhoService.findCarrinhoByIdService(req.params.id);

        if (!carrinho){
            return res.status(400).send({message: `Carrinho especificado não encontrado!`});
        }

        let erros = [];  //var para acumular os erros

        //verifica se os produtos passados no body existem na base, iterando individualmente
        await Promise.all(req.body.produtos.map(async (value, key) => {
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

        return res.status(200).send(await carrinhoService.updateCarrinhoService(req.params.id, req.body));

    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
}


const deleteCarrinhoController = async (req, res) => {
    try{
        //verifica se o Carrinho existe
        const carrinho = await carrinhoService.findCarrinhoByIdService(req.params.id);

        if (!carrinho){
            return res.status(400).send({message: `Carrinho especificado não encontrado!`});
        }

        const deletedCarrinho = await carrinhoService.deleteCarrinhoService(req.params.id);

        if (deletedCarrinho == null){
            return res.status(400).send({message: `Não foi possível excluir o Carrinho de compras!`});
        }else{
            return res.status(200).send({message: `Carrinho deletado com sucesso`});
        }

    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
}


module.exports = {
    findCarrinhoByIdController,
    findAllCarrinhosController,
    createCarrinhoController,
    updateCarrinhoController,
    deleteCarrinhoController
}