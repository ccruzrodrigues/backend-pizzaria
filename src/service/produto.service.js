const Produto = require("../model/Produto");


const findProductByIdServices = (id) => {
    return Produto.findById(id);
}


const findAllProductsService = (limit, offset) => {
    return Produto.find().limit(limit).skip(offset);
}


const createProductService = (body) => {
    return Produto.create(body);
}


const updateProductService = (id, body) => {
    return Produto.findByIdAndUpdate(id, body, { returnDocument: "after" });
}


const deleteProductService = (id) => {
    return Produto.findByIdAndRemove(id);
}


const addCategoriaProdutoService = (id, categoria) => {
    return Produto.findOneAndUpdate(
        {
            _id: id
        },
        {
            $push: {
                categorias: {
                    _id: categoria._id
                },
            },
        },
        {
            rawResult: true,
        }
    );
}


const removeCategoriaProdutoService = (id, categoria) => {
    return Produto.findOneAndUpdate(
        {
            _id: id
        },
        {
            $pull: {
                categorias: {
                    _id : categoria._id,
                }
            }
        },
        {
            rawResult: true,
        }
    );
}


const findProdutoByNameService = (v_nome) => {
    return Produto.findOne(
        { nome: v_nome }
    );
}


const findProdutoBycodigoBarraService = (v_codigoBarra) => {
    return Produto.findOne(
        { codigoBarra: v_codigoBarra }
    );
}


module.exports = {
    findProductByIdServices,
    findAllProductsService,
    createProductService,
    updateProductService,
    deleteProductService,
    addCategoriaProdutoService,
    removeCategoriaProdutoService,
    findProdutoByNameService,
    findProdutoBycodigoBarraService
}