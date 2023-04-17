const Categoria = require("../model/Categoria");


const findCategoriaByIdService = (id) => {
    return Categoria.findById(id);
};


const findAllCategoriasService = (limit, offset) => {
    return Categoria.find().limit(limit).skip(offset);
};


const createCategoriaService = (body) => {
    return Categoria.create(body);
};


const updateCategoriaService = (id, body) => {
    return Categoria.findByIdAndUpdate(id, body, { returnDocument: "after" });
};


const deleteCategoriaService = (id) => {
    return Categoria.findByIdAndRemove(id);
};


const findCategoriaByNameService = (v_name) => {
    return Categoria.findOne(
        { nome: v_name }
    );
}



module.exports = {
    findCategoriaByIdService,
    findAllCategoriasService,
    createCategoriaService,
    updateCategoriaService,
    deleteCategoriaService,
    findCategoriaByNameService
}