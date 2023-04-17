const router =  require("express").Router();

const usuarioController = require("../controller/usuario.controller");

const authMiddleware = require("../middleware/auth.middleware");
const { validaUsuario, validaIdParams, valida_IdBody, validaEndereco } = require("../middleware/validacao.middleware");
const paginacao = require("../middleware/paginacao.middleware");


//rotas GET
router.get('/find/:id', authMiddleware, validaIdParams, usuarioController.findUserByIdController);
router.get('/findAll', authMiddleware, paginacao, usuarioController.findAllUsersController);

//rotas POST
router.post('/create', authMiddleware, validaUsuario, usuarioController.createUserController);
router.post('/addAddress/:id', authMiddleware, validaIdParams, validaEndereco, usuarioController.addUserAddressController);
router.post('/addFavProduct/:id', authMiddleware, validaIdParams, valida_IdBody, usuarioController.addUserFavProductController);

//rotas PUT
router.put('/update/:id', authMiddleware, validaIdParams, validaUsuario, usuarioController.updateUserController);

//rotas DELETE
router.delete('/delete/:id', authMiddleware, validaIdParams, usuarioController.deleteUserController);
router.delete('/removeAddress/:id', authMiddleware, validaIdParams, valida_IdBody, usuarioController.removeUserAddressController);
router.delete('/removeFavProduct/:id', authMiddleware, validaIdParams, valida_IdBody, usuarioController.removeUserFavProductController);


module.exports = router;