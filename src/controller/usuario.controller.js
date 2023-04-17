
const UserService = require("../service/usuario.service");
const ProdutoService = require("../service/produto.service");


const findUserByIdController = async (req, res) => {
    try{
        const user = await UserService.findUserByIdService(req.params.id);

        if (!user){
            return res.status(404).send({message: `Usuario especificado não encontrado!`});
        }
        return res.status(200).send(user);

    }catch(err){
        if(err.kind=="ObjectId"){
            return res.status(400).send({message: `ID Informado está incorreto!`});
        }
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
};


const findAllUsersController = async (req, res) => {
    try{
        const usuarios = await UserService.findAllUsersService(req.query.limit, req.query.offset)

        if (usuarios.length == 0){
            return res.status(404).send({message: `Não há Usuários cadastrados na base!`});
        }else{
            return res.status(200).send(usuarios);
        }

    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
};


const createUserController = async (req, res) => {
    try{
        const user = await UserService.findUserByEmailService(req.body.email);

        if (!user){
            return res.status(201).send(await UserService.createUserService(req.body));
        }else{
            //if achar email na base - --> msg já existe cadastro para este email
            return res.status(400).send({message: `Já existe cadastro para este email!`});
        }
    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
};


const updateUserController = async (req, res) => {
    try{
        const user = await UserService.findUserByIdService(req.params.id);

        if (!user){
            return res.status(400).send({message: `Usuario não encontrado na base!`});
        }
        //testa se update troca também o email
        if (req.body.email != user.email){
            return res.status(400).send({message: `Campo email não pode ser alterado!`});
        }
        
        return res.status(200).send(await UserService.updateUserService(req.params.id, req.body) );
        
    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
};


const deleteUserController = async (req, res) => {
    try{
        const user = await UserService.findUserByIdService(req.params.id);

        if (!user){
            return res.status(400).send({message: `Usuario não encontrado na base!`});
        }

        const deletedUser = await UserService.deleteUserService(req.params.id);

        if (deletedUser == null){
            return res.status(400).send({message: `Houve algum problema ao deletar o Usuário!`});
        }else{
            return res.status(200).send({message: `Usuário deletado com sucesso`});
        }

    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
};


const addUserAddressController = async (req, res) => {
    try{
        //verifica se usuario existe na base
        const usuario = await UserService.findUserByIdService(req.params.id);
        let found = false;

        if (!usuario){
            return res.status(400).send({message: `Usuário não encontrado. Não é possível adicionar endereço!`});
        }

        //verifica se o usuario já tem esse endereço adicionado.
        usuario.enderecos.map( (valor, chave) =>{
            if(valor.logradouro == req.body.logradouro && valor.numero == req.body.numero && valor.cep == req.body.cep){
                found = true;
            }
        });

        if (found){
            return res.status(400).send({message: `Este endereço já foi adicionado a este usuário`});
        }

        //Adiciona o endereço ao usuario informado no parametro
        const endereco = await UserService.addUserAddressService(req.params.id, req.body);

        if (endereco.value == null){
            return res.status(400).send({message: `Algo deu errado na adição do Endereço!`});
        }else{
            return res.status(201).send({message: `Endereço adicionado com sucesso`});
        }

    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }

};


const removeUserAddressController = async (req, res) => {
    try{
        //verifica se usuario existe na base
        const usuario = await UserService.findUserByIdService(req.params.id);
        let found = false;

        if (!usuario){
            return res.status(400).send({message: `Usuário não encontrado. Não é possível excluir endereço!`});
        }

        //procede com a remoção do endereço do usuário informado na url.
        const endereco = await UserService.removeUserAddressService(req.params.id, req.body._id);

        endereco.value.enderecos.map( (valor, chave) =>{
            if(valor._id == req.body._id){
                found = true;
            }
        });

        if (found){
            return res.status(200).send({message: `Endereço removido com sucesso`});
        }else{
            return res.status(400).send({message: `Endereço não encontrado. Não foi possível remover!`});
        }

    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
};


const addUserFavProductController = async (req, res) => {
    try{
        //verifica se usuario existe na base
        const usuario = await UserService.findUserByIdService(req.params.id);
        let found = false;

        if (!usuario){
            return res.status(400).send({message: `Usuário não encontrado. Não é possível favoritar produto!`});
        }

        //verifica se existe o produto a ser favoritado.
        let produto = await ProdutoService.findProductByIdServices(req.body._id);

        if (!produto){
            return res.status(400).send({message: `Produto não encontrado. Não é possível favoritar produto!`});
        }

        //verifica se o usuario já teve esse produto favoritado.
        usuario.produtos_fav.map( (valor, chave) =>{
            if(valor._id == req.body._id){
                found = true;
            }
        });

        if (found){
            return res.status(400).send({message: `Este produto já foi favoritado para este usuário`});
        }

        //Favorita produto informado no body para o usuário especificado na url
        produto = await UserService.addUserFavProductService(req.params.id, req.body._id);

        if (produto.value == null){
            return res.status(400).send({message: `Algo deu errado na adição do Produto!`});
        }else{
            return res.status(201).send({message: `Produto adicionado à lista de Favoritos com sucesso!`});
        }

    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
};


const removeUserFavProductController = async (req, res) => {
    try{
        ////verifica se usuario existe na base
        const usuario = await UserService.findUserByIdService(req.params.id);
        let found = false;

        if (!usuario){
            return res.status(400).send({message: `Usuário não encontrado. Não é possível remover o produto de favoritos!`});
        }

        //Remove produto informado no body da lista de Favoritos para o usuário especificado na url
        const produto = await UserService.removeUserFavProductService(req.params.id, req.body._id);

        produto.value.produtos_fav.map( (valor, chave) =>{
            if(valor._id == req.body._id){
                found = true;
            }
        })

        if (found){
            return res.status(200).send({message: `Produto removido da lista de favoritos com sucesso`});
        }else{
            return res.status(400).send({message: `Produto não encontrado nos favoritos. Não foi possível remover!`});
        }
  
    }catch(err){
        console.log(`Erro: ${err.message}`);        
        return res.status(500).send({message: `Erro Inesperado. Tente novamente!`});
    }
};


module.exports = {
    findUserByIdController,
    findAllUsersController,
    createUserController,
    updateUserController,
    deleteUserController,
    addUserAddressController,
    removeUserAddressController,
    addUserFavProductController,
    removeUserFavProductController
}