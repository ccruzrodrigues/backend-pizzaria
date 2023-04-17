const CategoriaService = require("../service/categoria.service");


const findCategoriaByIdController = async (req, res) => {
    try{
        const categoria = await CategoriaService.findCategoriaByIdService(req.params.id);

        if (!categoria){
            return res.status(404).send({message: `Categoria especificada não encontrada!`});
        }else{
            return res.status(200).send(categoria);
        }
    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
};


const findAllCategoriasController = async (req, res) => {
    try{
        const categorias = await CategoriaService.findAllCategoriasService(req.query.limit, req.query.offset);

        if (categorias.length == 0){
            return res.status(404).send({message: `Não há Categorias cadastradas na base!`});
        }else{
            return res.status(200).send(categorias);
        }
    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
};


const createCategoriaController = async (req, res) => {
    try{
        const categoria = await CategoriaService.findCategoriaByNameService(req.body.nome);

        if (!categoria){
                return res.status(201).send(await CategoriaService.createCategoriaService(req.body));
        }else{
            //if achar categoria na base - --> msg categoria já cadastrada
            return res.status(400).send({message: `Nome de categoria já cadastrado no Sistema!`});
        }
    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
};


const updateCategoriaController = async (req, res) => {
    try{
        //verifica se a categoria existe
        let categoria = await CategoriaService.findCategoriaByIdService(req.params.id);
        if (!categoria){
            return res.status(400).send({message: `Categoria especificada não encontrada!`});
        }

        //verifica se em caso de mudança do nome, esse nome já existe na base
        categoria = await CategoriaService.findCategoriaByNameService(req.body.nome);
        if (!categoria){
                return res.status(201).send(await CategoriaService.createCategoriaService(req.body));
        }
        
        res.status(200).send(await CategoriaService.updateCategoriaService(req.params.id, req.body));

    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
};


const deleteCategoriaController = async (req, res) => {
    try{
        //verifica se a categoria existe
        let categoria = await CategoriaService.findCategoriaByIdService(req.params.id);

        if (!categoria){
            return res.status(400).send({message: `Categoria especificada não encontrada!`});
        }

        //procede com a exclusão da categoria especificada
        const deletedCategoria = await CategoriaService.deleteCategoriaService(req.params.id)

        if (deletedCategoria == null){
            return res.status(400).send({message: `Houve algum erro na exclusão da Categoria!`});
        }else{
            return res.status(200).send({message: `Categoria deletada com sucesso`});
        }

    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }    
};


module.exports = {
    findCategoriaByIdController,
    findAllCategoriasController,
    createCategoriaController,
    updateCategoriaController,
    deleteCategoriaController
}