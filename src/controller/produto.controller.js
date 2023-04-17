const ObjectId = require("mongoose").Types.ObjectId;
const ProdutoService = require("../service/produto.service");
const CategoriaService = require("../service/categoria.service");


const findProductByIdController = async (req, res) => {
    try{
        const produto = await ProdutoService.findProductByIdServices(req.params.id);

        if (!produto){
            return res.status(404).send({message: `Produto especificado não encontrado!`});
        }else{
            return res.status(200).send(produto);
        }
    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
}


const findAllProductsController = async (req, res) => {
    try{
        const produtos = await ProdutoService.findAllProductsService(req.query.limit, req.query.offset);

        if (produtos.length == 0){
            return res.status(404).send({message: `Não há Produtos cadastrados na base!`});
        }else{
            return res.status(200).send(produtos);
        }
    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
}


const createProductController = async (req, res) => {
    try{
        //verifica se já existe um produto cadastrado com esse mesmo nome
        const nomeProduto = await ProdutoService.findProdutoByNameService(req.body.nome);
        const codigoBarra = await ProdutoService.findProdutoBycodigoBarraService(req.body.codigoBarra);

        //se achar produto com mesmo nome na base  -->  msg produto já cadastrado
        if(nomeProduto != null){
            return res.status(400).send({message: `O nome do Produto informado já existe no Sistema!`});
        }

        //se achar codigo de barras pertencente a algum outro produto  -->  msg produto já cadastrado
        if(codigoBarra != null){
            return res.status(400).send({message: `O Código de barras informado já existe no Sistema!`});
        }


         // se vier categorias, testa cada uma pra ver se existem no sistema
        if(req.body.categorias != null){

            if(req.body.categorias.length > 0){
                let erros = [];  //var para acumular os erros
                
                //verifica se os IDs das categorias passados no body são válidos, iterando individualmente
                await Promise.all(req.body.categorias.map( async (value, key) => {
                    if (!ObjectId.isValid(value._id)){
                        erros.push(`'${key+1} - _id - ID fora de padrão! '`);
                        return;
                    }
                }));

                //se tiver IDs inválidos, informa e já retorna, evitando derrubar aplicação chamando rotina com ID inválido
                if(erros.length > 0){
                    return res.status(400).send({message: `Campo(s) Inválido(s):  ${erros} !`});
                }

                //após validar os IDs das categorias, verifica se as mesmas existem na base
                await Promise.all(req.body.categorias.map( async (value, key) => {
                    let categoria = await CategoriaService.findCategoriaByIdService(value._id);
                    if (!categoria){
                        erros.push(`'${key+1} - _id - Categoria inexistente!'`); 
                    }
                }));


                if(erros.length != 0){
                    if(erros.length == 1){
                        return res.status(400).send({message: `O campo ${erros}`});
                    }else{
                        return res.status(400).send({message: `Os campos ${erros}`});
                    }
                }
            }
        }

        //adiciona o Id do user logado no body e repassa pra criar o produto
        const corpo = {  
            ...req.body,  
            userId: req.userId
        }

        return res.status(201).send(await ProdutoService.createProductService(corpo));

    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
}


const updateProductController = async (req, res) => {
    try{
        //verifica se o produto informado existe na base
        const produto = await ProdutoService.findProductByIdServices(req.params.id);
        if(!produto){
            return res.status(400).send({message: `Produto não encontrado. Não é possível atualizar!`});
        }

        const codBarraBody = req.body.codigoBarra;
        //se vier código de barra, testa se é diferente do codBarra atual do Produto
        if(codBarraBody != produto.codigoBarra){
            //se for diferente, verifica se o informado já existe no sistema, impedindo erro na app.
            const codigoBarra = await ProdutoService.findProdutoBycodigoBarraService(req.body.codigoBarra);
            if(codigoBarra != null){
                return res.status(400).send({message: `O Código de barras informado já existe no Sistema. Não é possivel atualizar!`});
            }
        }

         // se vier categorias, testa cada uma pra ver se existem no sistema
        if(req.body.categorias.length > 0){
            let erros = [];  //var para acumular os erros
            
            //verifica se os IDs das categorias passados no body são válidos, iterando individualmente
            await Promise.all(req.body.categorias.map( async (value, key) => {
                if (!ObjectId.isValid(value._id)){
                    erros.push(`'${key+1} - _id - ID fora de padrão! '`);
                    return;
                }
            }));

            //se tiver IDs inválidos, informa e já retorna, evitando derrubar aplicação chamando rotina com ID inválido
            if(erros.length > 0){
                return res.status(400).send({message: `Campo(s) Inválido(s):  ${erros} !`});
            }

            //após validar os IDs das categorias, verifica se as mesmas existem na base
            await Promise.all(req.body.categorias.map( async (value, key) => {
                let categoria = await CategoriaService.findCategoriaByIdService(value._id);
                if (!categoria){
                    erros.push(`'${key+1} - _id - Categoria inexistente!'`); 
                }
            }));


            if(erros.length != 0){
                if(erros.length == 1){
                    return res.status(400).send({message: `O campo ${erros}`});
                }else{
                    return res.status(400).send({message: `Os campos ${erros}`});
                }
            }
        }

        return res.status(200).send(await ProdutoService.updateProductService(req.params.id, req.body));

    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
}


const deleteProductController = async (req, res) => {
    try{
        //verifica se o produto informado existe na base
        const produto = await ProdutoService.findProductByIdServices(req.params.id);
        if(!produto){
            return res.status(400).send({message: `Produto não encontrado. Não é possível atualizar!`});
        }

        const deletedProduct = await ProdutoService.deleteProductService(req.params.id);

        if (deletedProduct == null){
            return res.status(400).send({message: `Houve algum erro na exclusão de produto!`});
        }else{
            return res.status(200).send({message: `Produto deletado com sucesso`});
        }

    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
}


const addCategoriaProdutoController = async (req, res) => {
    try{
        //verifica se o produto existe na base
        const produto = await ProdutoService.findProductByIdServices(req.params.id);
        let found = false;

        if (!produto){
            return res.status(400).send({message: `Produto não encontrado na base!`});
        }

        //verifica se a categoria está cadastrada na base
        const categoria = await CategoriaService.findCategoriaByIdService(req.body._id);

        if (!categoria){
            return res.status(400).send({message: `Categoria não encontrada na base!`});
        }

        //verifica se a categoria já tinha sido adicionada ao Produto.
        produto.categorias.map( (valor, chave) =>{
            if(valor._id == req.body._id){
                found = true;
            }
        });

        if (found){
            return res.status(400).send({message: `Esta categoria já foi adicionada a este produto.`});
        } 

        //procede com a adiçao da categoria ao produto
        const newProdCategory = await ProdutoService.addCategoriaProdutoService(req.params.id, req.body);

        if (!newProdCategory){
            return res.status(400).send({message: `Algo deu errado na adição da categoria ao produto!`});
        }else{
            return res.status(201).send({message: `Categoria adicionada com sucesso ao produto!`});
        }

    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
}


const removeCategoriaProdutoController = async (req, res) => {
    try{

        //verifica se a categoria existe na base
        let produto = await ProdutoService.findProductByIdServices(req.params.id);
        if (!produto){
            return res.status(400).send({message: `Produto não encontrado. Não é possível remover categoria!`});
        }

        //verifica se as categorias existem no produto informado.
        let found = false;        
        produto.categorias.map((valor, chave) =>{
            if(valor._id == req.body._id){
                found = true;
            }
        });

        if (!found){
            return res.status(400).send({message: `Categoria não encontrada. Não é possível remover de produto!`});
        }   

        //procede com a remoção da categoria do produto informado.
        produto = await ProdutoService.removeCategoriaProdutoService(req.params.id, req.body);

        if (!produto){
            return res.status(400).send({message: `Algo deu errado. Não foi possível remover categoria!`});
        }else{
            return res.status(200).send({message: `Categoria removida com sucesso`});
        }

    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
}


module.exports = {
    findProductByIdController,
    findAllProductsController,
    createProductController,
    updateProductController,
    deleteProductController,
    addCategoriaProdutoController,
    removeCategoriaProdutoController
}