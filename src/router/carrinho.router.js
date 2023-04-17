const router = require("express").Router();

const carrinhoController = require("../controller/carrinho.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { validaCarrinho, validaIdParams, validaProdutosCarrinhoPedido } = require("../middleware/validacao.middleware");
const paginacao = require("../middleware/paginacao.middleware");


router.get("/find/:id", authMiddleware, validaIdParams, carrinhoController.findCarrinhoByIdController);
router.get("/findAll", authMiddleware,paginacao, carrinhoController.findAllCarrinhosController );

router.post("/create", authMiddleware, validaProdutosCarrinhoPedido, validaCarrinho, carrinhoController.createCarrinhoController);
router.put("/update/:id", authMiddleware, validaIdParams, validaProdutosCarrinhoPedido, validaCarrinho, carrinhoController.updateCarrinhoController);

router.delete("/delete/:id", authMiddleware, validaIdParams, carrinhoController.deleteCarrinhoController);


module.exports = router;