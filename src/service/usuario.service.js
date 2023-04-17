
const Usuario = require("../model/Usuario");


const findUserByIdService = (id) => {
    return Usuario.findById(id);
};


const findAllUsersService = (limit, offset) => {
    return Usuario.find().limit(limit).skip(offset);
};


//verifica se existe email cadastrado antes de um create.
const findUserByEmailService = (v_email) => {
    return Usuario.findOne(
        { email: v_email }
    )
};


const createUserService = (body) => {
    return Usuario.create(body);
};


const updateUserService = (id, body) => {
    return Usuario.findByIdAndUpdate(id, body, {returnDocument: "after"});
};


const deleteUserService = (id) => {
    return Usuario.findByIdAndRemove(id);
};


const addUserAddressService = (id, endereco) => {
    return Usuario.findOneAndUpdate(
        {
            _id: id, 
        },
        {
            $push:{
                enderecos: endereco
            }
        },
        {
            rawResult: true,
        }
    )
};


const removeUserAddressService = (id, addressId) => {
    return Usuario.findOneAndUpdate(
        {
            _id: id, 
        },
        {
            $pull:{
                enderecos: {
                    _id: addressId
                },
            }
        },
        {
            rawResult: true,
        }
    )    

};


const addUserFavProductService = (id, productId) => {
    return Usuario.findOneAndUpdate(
        {
            _id: id,
        },
        {
            $push: {
                produtos_fav: {
                    _id: productId,
                }
            }
        },
        {
            rawResult: true,
        }
    );
};


const removeUserFavProductService = (id, productId) => {
    return Usuario.findOneAndUpdate(
        {
            _id: id,
        },
        {
            $pull: {
                produtos_fav: {
                    _id: productId,
                }
            }
        },
        {
            rawResult: true,
        }
    );
};


module.exports = {
    findUserByIdService,
    findAllUsersService,
    createUserService,
    updateUserService,
    deleteUserService,
    addUserAddressService,
    removeUserAddressService,
    addUserFavProductService,
    removeUserFavProductService,
    findUserByEmailService
}