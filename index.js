const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectToDatabase = require("./src/database/database"); //arquivo de conexão com o banco

const usuario = require("./src/router/usuario.router"); //arquivo de rota do usuario
const auth = require("./src/router/auth.router"); //arquivo de rota de auth
const produto = require("./src/router/produto.router"); //arquivo de rota de produto
const categoria = require("./src/router/categoria.router"); //arquivo de rota de categoria
const carrinho = require("./src/router/carrinho.router"); //arquivo de rota do carrinho
const pedido = require("./src/router/pedido.router"); //arquivo de rota do pedido
const docs = require("./src/router/docs.router"); //arquivo de rota do docs


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors(
    {
        origin: "127.0.0.1:3001",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    }
));

connectToDatabase(); //conectando ao banco

app.use("/usuario", usuario); //chamando as rotas do usuário
app.use("/auth", auth); //chamando as rotas de auth
app.use("/produto", produto); //chamando as rotas de produto
app.use("/categoria", categoria); //chamando as rotas de categoria
app.use("/carrinho", carrinho); //chamando as rotas do carrinho
app.use("/pedido", pedido); //chamando as rotas do pedido
app.use("/docs", docs); //chamando as rotas do docs


app.get("/", (req, res) => {
    res.send( {message: "Bem vindo a Pizzaria - Cantinho dos Devs ;)"} );
});


app.listen(port, () => {
    console.log(`Servidor Rodando em http://localhost:${port}`);
});