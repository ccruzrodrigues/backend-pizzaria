const ObjectId = require("mongoose").Types.ObjectId;


const validaUsuario = (req, res, next) => {
    let erros = [];  //var para acumular os erros

    if (!req.body.nome){
        erros.push("nome"); 
    }
    if (!req.body.email){
        erros.push("email"); 
    }
    if (!req.body.senha){
        erros.push("senha"); 
    }
    if (!req.body.imagem){
        erros.push("imagem"); 
    }
    if (req.body.admin != undefined){ 
        //testa se é true|false. Evita bug que se informado   "admin": ""   deixaria passar, derrubando aplicação.
        if( (req.body.admin != "true") && (req.body.admin != "false") ){
            erros.push("admin");
        }
    }

    //se foi informado endereço, faz a validação do mesmo.
    if (req.body.enderecos != undefined){ 
        req.body.enderecos.map((value, key) => {
            if (!value.logradouro){
                erros.push(`'${key+1} - logradouro'`); 
            }
            if (!value.numero){
                erros.push(`'${key+1} - numero'`); 
            }
            if (!value.cep){
                erros.push(`'${key+1} - cep'`); 
            }
        });
    }
    
    // testando a quantidade de erros e tomando decisão conforme quantidade retornada.
    if(erros.length == 0){
        return next();
    }else{
        if(erros.length == 1){
            return res.status(400).send({message: `O campo ${erros} precisa ser preenchido!`});
        }else{
            return res.status(400).send({message: `Os campos ${erros} precisam ser preenchidos!`});
        }
    }
}


const validaEndereco = (req, res, next) => {
    let erros = [];  //var para acumular os erros

    //Conversão de Obj pra Array, pra chamar map() s/ erros.
    Array(req.body).map((value, key) => {
        if (!value.logradouro){
            erros.push(`'${key+1} - logradouro'`); 
        }
        if (!value.numero){
            erros.push(`'${key+1} - numero'`); 
        }
        if (!value.cep){
            erros.push(`'${key+1} - cep'`); 
        }

    });

    // testando a quantidade de erros e tomando decisão conforme quantidade retornada.
    if(erros.length == 0){
        return next();
    }else{
        if(erros.length == 1){
            return res.status(400).send({message: `O campo ${erros} precisa ser preenchido!`});
        }else{
            return res.status(400).send({message: `Os campos ${erros} precisam ser preenchidos!`});
        }
    }
}


const validaProduto = (req, res, next) => {
    let erros = [];  //var para acumular os erros

    if (!req.body.nome){
        erros.push("nome"); 
    }
    if (!req.body.descricao){
        erros.push("descricao"); 
    }
    if (!req.body.precoUnitario){
        erros.push("precoUnitario"); 
    }
    if (!req.body.imagem){
        erros.push("imagem"); 
    }
    if (!req.body.codigoBarra){
        erros.push("codigoBarra"); 
    }
    
    // testando a quantidade de erros e tomando decisão conforme quantidade retornada.
    if(erros.length == 0){
        return next();
    }else{
        if(erros.length == 1){
            return res.status(400).send({message: `O campo  ${erros} precisa ser preenchido!`});
        }else{
            return res.status(400).send({message: `Os campos  ${erros} precisam ser preenchidos!`});
        }
    }
}


const validaCategoria = (req, res, next) => {
    let erros = [];  //var para acumular os erros

    if (!req.body.nome){
        erros.push("nome"); 
    }
    if (!req.body.descricao){
        erros.push("descricao"); 
    }
    
    // testando a quantidade de erros e tomando decisão conforme quantidade retornada.
    if(erros.length == 0){
        return next();
    }else{
        if(erros.length == 1){
            return res.status(400).send({message: `O campo ${erros} precisa ser preenchido!`});
        }else{
            return res.status(400).send({message: `Os campos ${erros} precisam ser preenchidos!`});
        }
    }
}


const validaCarrinho = (req, res, next) => {
    let erros = [];  //var para acumular os erros

    if (!req.body.precoTotal){
        erros.push("precoTotal"); 
    }
    if (!req.body.frete){
        erros.push("frete"); 
    }

    // testando a quantidade de erros e tomando decisão conforme quantidade retornada.
    if(erros.length == 0){
        return next();
    }else{
        if(erros.length == 1){
            return res.status(400).send({message: `O campo ${erros} precisa ser preenchido corretamente!`});
        }else{
            return res.status(400).send({message: `Os campos ${erros} precisam ser preenchidos corretamente!`});
        }
    }
}


const validaPedido = (req, res, next) => {
    let erros = [];  //var para acumular os erros

    if (!req.body.precoTotal){
        erros.push("precoTotal"); 
    }
    if (!req.body.frete){
        erros.push("frete"); 
    }

    if (req.body.concluido == undefined){  //se tiver vazio
        erros.push("concluido");
    }else{
        //se tiver algo, tem que ser somente ou true ou false.
        if( (req.body.concluido != "true") && (req.body.concluido != "false") ){
            erros.push("concluido"); 
        }
    }
    
    // testando a quantidade de erros e tomando decisão conforme quantidade retornada.
    if(erros.length == 0){
        return next();
    }else{
        if(erros.length == 1){
            return res.status(400).send({message: `O campo ${erros} precisa ser preenchido!`});
        }else{
            return res.status(400).send({message: `Os campos ${erros} precisam ser preenchidos!`});
        }
    }
}


const validaIdParams = (req, res, next) => {
    if (ObjectId.isValid(req.params.id)){
        return next();
    }else{
        return res.status(400).send({message: `ID informado não corresponde ao padrão esperado! (IdParams)`});
    }
}


const valida_IdBody = (req, res, next) => {
    if (ObjectId.isValid(req.body._id)){
        return next();
    }else{
        return res.status(400).send({message: `ID informado não corresponde ao padrão esperado! (IdBody)`});
    }
}


const validaLogin = (req, res, next) => {
    let erros = [];  //var para acumular os erros

    if (!req.body.email){
        erros.push("email"); 
    }
    if (!req.body.senha){
        erros.push("senha"); 
    }
    
    // testando a quantidade de erros e tomando decisão conforme quantidade retornada.
    if(erros.length == 0){
        return next();
    }else{
        if(erros.length == 1){
            return res.status(400).send({message: `O campo ${erros} precisa ser preenchido!`});
        }else{
            return res.status(400).send({message: `Os campos ${erros} precisam ser preenchidos!`});
        }
    }
}


const validaProdutosCarrinhoPedido = (req, res, next) => {
    let erros = [];  //var para acumular os erros

    req.body.produtos.map((value, key) => {
        if (!value._id){
            erros.push(`'${key+1} - _id'`); 
        }
        if (!ObjectId.isValid(value._id)){
            erros.push(`'${key+1} - _id - Tipo inválido!'`); 
        }
        if (!value.quantidade){
            erros.push(`'${key+1} - quantidade'`); 
        }
    });

    // testando a quantidade de erros e tomando decisão conforme quantidade retornada.
    if(erros.length == 0){
        return next();
    }else{
        if(erros.length == 1){
            return res.status(400).send({message: `O campo ${erros} precisa ser preenchido!`});
        }else{
            return res.status(400).send({message: `Os campos ${erros} precisam ser preenchidos!`});
        }
    }
}


module.exports = {
    validaUsuario,
    validaEndereco,
    validaProduto,
    validaCategoria,
    validaCarrinho,
    validaPedido,
    validaIdParams,
    valida_IdBody,
    validaLogin,
    validaProdutosCarrinhoPedido
}