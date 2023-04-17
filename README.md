# Backend-Pizzaria-NodeJs

Sistema de Backend completo em MVC com API Rest e toda interface da documentação em Swagger.

Recursos usados no projeto:

1. HTML5/CSS3/Javascript
2. MongoDB
3. Mongoose
4. Express
5. DBCrypt
6. Json web Token JWT
7. Swagger
8. CORS
9. Padrão MVC (router, middleware, controller, service, model, database)

## Instalação

1. baixe todo o código
2. abra o terminal do VS Code
3. npm i -D nodemon (ambiente Desenvolvimento - não gera dependência)
4. execute npm i express mongoose jsonwebtoken bcrypt swagger-ui-express cors
5. rode usando npm run dev

## URLs de acesso

1. server:   http://localhost
2. porta:  3000
3. url de acesso:  http://localhost:3000

## Requisições e retornos

### Métodos

As Requisições para a API devem seguir os padrões:


| Método  | Descrição                                             |
| ---------- | --------------------------------------------------------- |
| `GET`    | Retorna informações de um ou mais registros.          |
| `POST`   | Utilizado para criar um novo registro.                  |
| `PUT`    | Atualiza dados de um registro ou altera sua situação. |
| `DELETE` | Remove um registro do sistema.                          |

### Respostas

As respostas às Requisições são baseadas nos seguintes códigos de retorno:


| Código | Descrição                                                   |
| --------- | --------------------------------------------------------------- |
| `200`   | Requisição executada com sucesso (success).                 |
| `201`   | Informação cadastrada com sucesso (Created).                |
| `400`   | Requisição inválida (Bad Request).                         |
| `401`   | Erro de Autenticação. Problemas com o Token (Unauthorized). |
| `404`   | Registro pesquisado não encontrado (Not found).              |
| `500`   | Erro interno no Servidor (Internal Server Error).             |

## Autenticação

Para testar a API e gerar o **Token de acesso**, primeiramente crie um ***login*** em **/usuario/create**.

## Endpoints

Todos os endpoints da aplicação serão listados abaixo:

.

## Dados de Usuário [/usuario]

Endpoints de Usuário

### /usuario/findAll

Retorna todos os usuários cadastrados no Sistema. Assume limit = 10, como parâmetro de paginação.

exemplo: http://127.0.0.1:3000/usuario/findAll

### /usuario/findAll?limit=val_lim&offset=val_offset

Retorna todos os usuários cadastrados no Sistema. Considera os valores informados na Url abaixo:

**val_lim** -> Define limite da paginação (se não definido, valor default é 10).

**val_offset** -> Define limite do offset da paginação.

*exemplo*: http://127.0.0.1:3000/usuario/findAll?limit=50&offset=0

*Retorno esperado nas duas consultas:*

````
[
  {
    "nome": "string",
    "email": "string",
    "senha": "string",
    "imagem": "string",
    "enderecos": [
      {
        "logradouro": "string",
        "numero": 0,
        "complemento": "string",
        "cep": "string",
        "createdAt": "string"
      }
    ],
    "produtos_fav": [
      {
        "_id": "string",
        "createdAt": "string"
      }
    ],
    "admin": true,
    "createdAt": "string"
  }
]

````

### /usuario/find/\{id\}

Retorna informação de um usuário específico, informado no {id} da Url.

**{id}** -> Código único cadastrado na base dados, referente ao usuário.

*exemplo*: http://127.0.0.1:3000/usuario/find/642a077731bdcf2c9f085797

*Retorno esperado da consulta:*

```
{
  "_id": "642a077731bdcf2c9f085797",
  "nome": "Steve Jobs",
  "email": "stevejobs@apple.com",
  "senha": "$2b$10$K7Moa2KRokBLZ6YKEHXbD.XRcHfAaRtCfhyLzQ3cYcrpr/FKEet0.",
  "imagem": "pathToImage",
  "admin": false,
  "createdAt": "2023-04-02T22:49:23.552Z",
  "enderecos": [
    {
      "logradouro": "Beco dos desaparecidos",
      "numero": 888888,
      "cep": "333333-000",
      "createdAt": "2023-04-11T15:50:52.212Z",
      "_id": "6435b231935c1f19669cac02"
    }
  ],
  "__v": 0,
  "produtos_fav": [
    {
      "_id": "642e557a9c38b4dda1b68613",
      "createdAt": "2023-04-11T03:02:57.691Z"
    },
    {
      "_id": "642e557a9c38b4dda1b68613",
      "createdAt": "2023-04-11T03:33:21.411Z"
    }
  ]
}
```

### /usuario/create

Cria um novo usuário no sistema conforme os dados informados no campo body da mensagem.

exemplo:

http://127.0.0.1:3000/usuario/create

*exemplo do body da mensagem passada também como parâmetro na consulta.*

```
{
    "nome": "Larry Page",
    "email": "larrypage@google.com",
    "senha": "page123",
    "imagem": "pathToBillImage",
    "enderecos": [
        {
            "logradouro": "Nova Inglaterra",
            "numero": 10,
            "cep": "111111-111"
        } 
    ]
}
```

### /usuario/update/\{id\}

Atualiza as informações do usuário, de Id informado na Url, com as informações do body da mensagem.

exemplo:

http://127.0.0.1:3000/usuario/update/642a077731bdcf2c9f085797

*exemplo do body da mensagem passada também como parâmetro na consulta.

```
{
  "nome": "Steve Jobs 3",
  "email": "stevejobs3@apple.com",
  "senha": "jobs3",
  "imagem": "img.apple.com/litlejobs1",
  "enderecos": [
    {
      "logradouro": "Rua das Celebridades",
      "numero": 888888,
      "cep": "333333-000"
    }
  ]
}
```

### /usuario/remove/\{id\}

Remove o usuário de Id informado na Url como parâmetro.

exemplo:

http://127.0.0.1:3000/usuario/remove/642a077731bdcf2c9f085797

*Retorno esperado - mensagem de confirmação:*

```
{
  "message": "Usuário removido com Sucesso!"
}
```

### /usuario/addAddress/\{id\}

Adiciona o endereço informado no body da mensagem ao usuário especificado no parâmetro Id da Url.

*exemplo:*

http://127.0.0.1:3000/usuario/addAddress/642a077731bdcf2c9f085797

*exemplo do body da mensagem passada também como parâmetro na consulta.*

```
{
  "logradouro": "Avenida Djalma Batista",
  "numero": 7070,
  "cep": "69000-000"
}
```

*Retorno esperado - mensagem de confirmação:*

```
{
  "message": "Endereço adicionado com sucesso!"
}
```

### /usuario/removeAddress/\{id\}

Remove o endereço informado no body da mensagem do usuário especificado no parâmetro Id da Url.

*exemplo:*

http://127.0.0.1:3000/usuario/removeAddress/642a077731bdcf2c9f085797

*exemplo do body da mensagem passada também como parâmetro na consulta.*

```
{
  "_id": "6435b231935c1f19669cac02"
}
```

Retorno esperado - mensagem de confirmação:*

```
{
  "message": "Endereço removido com Sucesso!"
}
```

### /usuario/addFavProduct/\{id\}

Adiciona produto, informado no body da mensagem, à lista de Favoritos do usuário especificado no parâmetro Id da Url.

*exemplo:*

http://127.0.0.1:3000/usuario/addFavProduct/642a077731bdcf2c9f085797

*exemplo do body da mensagem passada também como parâmetro na consulta.*

```
{
  "_id": "6435b231935c1f19669cac02"
}
```

Retorno esperado - mensagem de confirmação:*

```
{
  "message": "Produto adicionado à lista de Favoritos com sucesso!"
}
```

### /usuario/removeFavProduct/\{id\}

Remove o produto informado no body da mensagem, da lista de Favoritos do usuário especificado no parâmetro Id da Url.

*exemplo:*

http://127.0.0.1:3000/usuario/removeAddress/642a077731bdcf2c9f085797

*exemplo do body da mensagem passada também como parâmetro na consulta.*

```
{
  "_id": "642e557a9c38b4dda1b68613"
}
```

Retorno esperado - mensagem de confirmação:*

```
{
  "message": "Endereço removido com Sucesso!"
}
```

.

## Dados de Produto [/produto]

Endpoints de Produto

### /produto/findAll

Retorna todos os produtos cadastrados no Sistema. Assume limit = 10, como parâmetro de paginação.

exemplo: http://127.0.0.1:3000/produto/findAll

### /produto/findAll?limit=val_lim&offset=val_offset

Retorna todos os produtos cadastrados no Sistema. Considera os valores informados na Url abaixo:

**val_lim** -> Define limite da paginação (se não definido, valor default é 10).

**val_offset** -> Define limite do offset da paginação.

*exemplo*: http://127.0.0.1:3000/produto/findAll?limit=50&offset=0

*Retorno esperado nas duas consultas:*

````
[
  {
    "_id": "6438a016dc2217d499b14f70",
    "nome": "Pizza Salgada de Mussarela",
    "descricao": "cupuaçu, chocolate, morango, queijo, milho, manjericao, tomate",
    "precoUnitario": 50,
    "imagem": "pathToImage",
    "codigoBarra": 33333333,
    "categorias": [
      {
        "_id": "642cd9da025cfb2a7f503a82",
        "createdAt": "2023-04-13T21:26:38.690Z"
      },
      {
        "_id": "642e3a9496cc5dffe1ec9a87",
        "createdAt": "2023-04-13T23:45:16.620Z"
      },
      {
        "_id": "642e3a9496cc5dffe1ec9a87",
        "createdAt": "2023-04-13T23:45:16.620Z"
      }
    ],
    "createdAt": "2023-04-13T21:26:38.690Z",
    "__v": 0
  }
]
````

### /produto/find/\{id\}

Retorna informação de um produto específico, informado no {id} da Url.

**{id}** -> Código único cadastrado na base dados, referente ao produto.

*exemplo*: http://127.0.0.1:3000/produto/find/642a077731bdcf2c9f085797

*Retorno esperado da consulta:*

```
{
  "_id": "6438a016dc2217d499b14f70",
  "nome": "Pizza Salgada de Mussarela",
  "descricao": "cupuaçu, chocolate, morango, queijo, milho, manjericao, tomate",
  "precoUnitario": 50,
  "imagem": "pathToImage",
  "codigoBarra": 33333333,
  "categorias": [
    {
      "_id": "642cd9da025cfb2a7f503a82",
      "createdAt": "2023-04-13T21:26:38.690Z"
    },
    {
      "_id": "642e3a9496cc5dffe1ec9a87",
      "createdAt": "2023-04-13T23:45:16.620Z"
    },
    {
      "_id": "642e3a9496cc5dffe1ec9a87",
      "createdAt": "2023-04-13T23:45:16.620Z"
    }
  ],
  "createdAt": "2023-04-13T21:26:38.690Z",
  "__v": 0
}
```

### /produto/create

Cria um novo produto no sistema conforme os dados informados no campo body da mensagem.

exemplo:

http://127.0.0.1:3000/produto/create

*exemplo do body da mensagem passada também como parâmetro na consulta.*

```
{
    "nome": "Pizza de Calabresa",
    "descricao": "calabresa, queijo, milho, azeitona, manjericao, tomate",
    "precoUnitario": 45,
    "imagem": "img.imgsite.com/produto1.jpeg",
    "codigoBarra": "1234567890"
}
```

### /produto/update/\{id\}

Atualiza as informações do produto, de Id informado na Url, com as informações do body da mensagem.

exemplo:

http://127.0.0.1:3000/produto/update/6438a016dc2217d499b14f70

*exemplo do body da mensagem passada também como parâmetro na consulta.

```
{
    "nome": "Pizza de Calabresa",
    "descricao": "calabresa, queijo, milho, azeitona, manjericao, tomate",
    "precoUnitario": 70,
    "imagem": "img.imgsite.com/produto1.jpeg",
    "codigoBarra": "99999999"
}
```

### /produto/remove/\{id\}

Remove o produto de Id informado na Url como parâmetro.

exemplo:

http://127.0.0.1:3000/produto/remove/6438a016dc2217d499b14f70

*Retorno esperado - mensagem de confirmação:*

```
{
  "message": "Produto removido com Sucesso!"
}
```

### /produto/addCategoria/\{id\}

Adiciona a categoria informada no body da mensagem, através de seu Id, ao produto especificado no parâmetro Id da Url.

*exemplo:*

http://127.0.0.1:3000/produto/addCategoria/642a077731bdcf2c9f085797

*exemplo do body da mensagem passada também como parâmetro na consulta.*

```
{
    "_id": "642e3a9496cc5dffe1ec9a87"
}
```

*Retorno esperado - mensagem de confirmação:*

```
{
  "lastErrorObject": {
    "n": 1,
    "updatedExisting": true
  },
  "value": {
    "_id": "6438a016dc2217d499b14f70",
    "nome": "Pizza Salgada de Mussarela",
    "descricao": "cupuaçu, chocolate, morango, queijo, milho, manjericao, tomate",
    "precoUnitario": 50,
    "imagem": "pathToImage",
    "codigoBarra": 33333333,
    "categorias": [
      {
        "_id": "642cd9da025cfb2a7f503a82",
        "createdAt": "2023-04-13T21:26:38.690Z"
      },
      {
        "_id": "642e3a9496cc5dffe1ec9a87",
        "createdAt": "2023-04-13T23:45:16.620Z"
      },
      {
        "_id": "642e3a9496cc5dffe1ec9a87",
        "createdAt": "2023-04-13T23:45:16.620Z"
      }
    ],
    "createdAt": "2023-04-13T21:26:38.690Z",
    "__v": 0
  },
  "ok": 1
}
```

### /produto/removeCategoria/\{id\}

Remove a categoria informada no body da mensagem através de Id, do produto especificado no parâmetro Id da Url.

*exemplo:*

http://127.0.0.1:3000/produto/removeCategoria/642a077731bdcf2c9f085797

*exemplo do body da mensagem passada também como parâmetro na consulta.*

```
{
  "_id": "6435b231935c1f19669cac02"
}
```

Retorno esperado - mensagem de confirmação:*

```
{
  "message": "Categoria removida com sucesso"
}
```

.

## Dados da Categoria [/categoria]

Endpoints da Categoria

### /categoria/findAll

Retorna todas as categorias cadastradas no Sistema. Assume limit = 10, como parâmetro de paginação.

exemplo: http://127.0.0.1:3000/categoria/findAll

### /categoria/findAll?limit=val_lim&offset=val_offset

Retorna todas as categorias cadastradas no SistemaRetorna todos os usuários cadastrados no Sistem. Considera os valores informados na Url abaixo:

**val_lim** -> Define limite da paginação (se não definido, valor default é 10).

**val_offset** -> Define limite do offset da paginação.

*exemplo*: http://127.0.0.1:3000/categoria/findAll?limit=50&offset=0

*Retorno esperado nas duas consultas:*

````
[
  {
    "_id": "642e3a9496cc5dffe1ec9a87",
    "nome": "Pizzas",
    "descricao": "Pizzas em Geral",
    "createdAt": "2023-04-06T03:08:36.473Z",
    "__v": 0
  }
]
````

### /categoria/find/\{id\}

Retorna informação de uma categoria específica, informado no {id} da Url.

**{id}** -> Código único cadastrado na base dados, referente a categoria.

*exemplo*: http://127.0.0.1:3000/categoria/find/642a077731bdcf2c9f085797

*Retorno esperado da consulta:*

```
{
  "_id": "642e3a9496cc5dffe1ec9a87",
  "nome": "Pizzas",
  "descricao": "Pizzas em Geral",
  "createdAt": "2023-04-06T03:08:36.473Z",
  "__v": 0
}
```

### /categoria/create

Cria uma nova categoria no sistema conforme os dados informados no campo body da mensagem.

exemplo:

http://127.0.0.1:3000/categoria/create

*exemplo do body da mensagem passada também como parâmetro na consulta.*

```
{
    "nome": "Pizzas Doces",
    "descricao": "Pizzas em Geral"
}
```

### /categoria/update/\{id\}

Atualiza as informações da categoria, de Id informado na Url, com as informações do body da mensagem.

exemplo:

http://127.0.0.1:3000/categoria/update/642a077731bdcf2c9f085797

*exemplo do body da mensagem passada também como parâmetro na consulta.

```
{
    "nome": "Bebidas",
    "descricao": "Bebidas em Geral"
}
```

### /categoria/remove/\{id\}

Remove a categoria correspondente ao Id informado na Url como parâmetro.

exemplo:

http://127.0.0.1:3000/usuario/remove/642a077731bdcf2c9f085797

*Retorno esperado - mensagem de confirmação:*

```
{
  "message": "Categoria removida com Sucesso!"
}
```

.

## Dados do Carrinho [/carrinho]

Endpoints do Carrinho

### /carrinho/findAll

Retorna todos os carrinhos cadastrados no Sistema. Assume limit = 10, como parâmetro de paginação.

exemplo: http://127.0.0.1:3000/carrinho/findAll

### /carrinho/findAll?limit=val_lim&offset=val_offset

Retorna todos os carrinhos cadastrados no Sistema. Considera os valores informados na Url abaixo:

**val_lim** -> Define limite da paginação (se não definido, valor default é 10).

**val_offset** -> Define limite do offset da paginação.

*exemplo*: http://127.0.0.1:3000/categoria/findAll?limit=50&offset=0

*Retorno esperado nas duas consultas:*

````
[
  {
    "_id": "6431b5093bbbfe848d4c7bdb",
    "produtos": [
      {
        "_id": "642e557a9c38b4dda1b68613",
        "quantidade": 2
      },
      {
        "_id": "642ef661f2c7b5a80df60d4f",
        "quantidade": 3
      }
    ],
    "precoTotal": 450,
    "frete": 50,
    "userId": "642a077731bdcf2c9f085797",
    "createdAt": "2023-04-08T18:40:06.075Z",
    "__v": 0
  }
]
````

### /carrinho/find/\{id\}

Retorna informação de um carrinho específico, informado no {id} da Url.

**{id}** -> Código único cadastrado na base dados, referente ao carrinho.

*exemplo*: http://127.0.0.1:3000/carrinho/find/6431b5093bbbfe848d4c7bdb

*Retorno esperado da consulta:*

```
{
  "_id": "6431b5093bbbfe848d4c7bdb",
  "produtos": [
    {
      "_id": "642e557a9c38b4dda1b68613",
      "quantidade": 2
    },
    {
      "_id": "642ef661f2c7b5a80df60d4f",
      "quantidade": 3
    }
  ],
  "precoTotal": 450,
  "frete": 50,
  "userId": "642a077731bdcf2c9f085797",
  "createdAt": "2023-04-08T18:40:06.075Z",
  "__v": 0
}
```

### /carrinho/create

Cria um novo carrinho no sistema conforme os dados informados no campo body da mensagem.

exemplo:

http://127.0.0.1:3000/carrinho/create

*exemplo do body da mensagem passada também como parâmetro na consulta.*

```
{
    "produtos": [
      {"_id":"642e557a9c38b4dda1b68613", "quantidade": 2},
      {"_id":"642ef661f2c7b5a80df60d4f", "quantidade": 3}
    ],
    "precoTotal": 450,
    "frete": 50
}
```

### /carrinho/update/\{id\}

Atualiza as informações do carrinho, de Id informado na Url, com as informações do body da mensagem.

exemplo:

http://127.0.0.1:3000/carrinho/update/642a077731bdcf2c9f085797

*exemplo do body da mensagem passada também como parâmetro na consulta.

```
{
    "produtos": [
      {"_id":"642e557a9c38b4dda1b68613", "quantidade": 500},
      {"_id":"642ef661f2c7b5a80df60d4f", "quantidade": 500}
    ],
    "precoTotal": 500,
    "frete": 500
}
```

### /carrinho/remove/\{id\}

Remove o carrinho correspondente ao Id informado na Url como parâmetro.

exemplo:

http://127.0.0.1:3000/carrinho/remove/6431b5093bbbfe848d4c7bdb

*Retorno esperado - mensagem de confirmação:*

```
{
  "message": "Carrinho removido com Sucesso!"
}
```

.

## Dados do Pedido [/pedido]

Endpoints do Pedido

### /pedido/findAll

Retorna todos os pedidos cadastrados no Sistema. Assume limit = 10, como parâmetro de paginação.

exemplo: http://127.0.0.1:3000/pedido/findAll

### /pedido/findAll?limit=val_lim&offset=val_offset

Retorna todos os pedidos cadastrados no Sistema. Considera os valores informados na Url abaixo:

**val_lim** -> Define limite da paginação (se não definido, valor default é 10).

**val_offset** -> Define limite do offset da paginação.

*exemplo*: http://127.0.0.1:3000/pedido/findAll?limit=50&offset=0

*Retorno esperado nas duas consultas:*

````
[
  {
    "_id": "6438c7f1d712d6f2bb8e48a3",
    "produtos": [
      {
        "_id": "642e557a9c38b4dda1b68613",
        "quantidade": 2
      },
      {
        "_id": "642ef661f2c7b5a80df60d4f",
        "quantidade": 3
      }
    ],
    "precoTotal": 450,
    "frete": 50,
    "userId": "642c9996951bb69bee7cc12f",
    "createdAt": "2023-04-13T23:45:16.632Z",
    "concluido": false,
    "__v": 0
  }
]
````

### /pedido/find/\{id\}

Retorna informação de um pedido específico, informado no {id} da Url.

**{id}** -> Código único cadastrado na base dados, referente ao pedido.

*exemplo*: http://127.0.0.1:3000/pedido/find/6431b5093bbbfe848d4c7bdb

*Retorno esperado da consulta:*

```
{
  "_id": "6438c7f1d712d6f2bb8e48a3",
  "produtos": [
    {
      "_id": "642e557a9c38b4dda1b68613",
      "quantidade": 2
    },
    {
      "_id": "642ef661f2c7b5a80df60d4f",
      "quantidade": 3
    }
  ],
  "precoTotal": 450,
  "frete": 50,
  "userId": "642c9996951bb69bee7cc12f",
  "createdAt": "2023-04-13T23:45:16.632Z",
  "concluido": false,
  "__v": 0
}
```

### /pedido/create

Cria um novo pedido no sistema conforme os dados informados no campo body da mensagem.

exemplo:

http://127.0.0.1:3000/pedido/create

*exemplo do body da mensagem passada também como parâmetro na consulta.*

```
{
  "produtos": [
    {
      "_id": "642e557a9c38b4dda1b68613",
      "quantidade": 2
    },
    {
      "_id": "642ef661f2c7b5a80df60d4f",
      "quantidade": 3
    }
  ],
  "precoTotal": 450,
  "frete": 50,
  "userId": "642c9996951bb69bee7cc12f",
  "createdAt": "2023-04-13T23:45:16.632Z",
  "concluido": false,
  "_id": "6438c7f1d712d6f2bb8e48a3",
  "__v": 0
}
```

### /pedido/updateStatus/\{id\}

Atualiza para Concluido o status do pedido de Id informado na Url.

exemplo:

http://127.0.0.1:3000/pedido/updateStatus/6438c7f1d712d6f2bb8e48a3

### /pedido/remove/\{id\}

Remove o pedido correspondente ao Id informado na Url como parâmetro.

exemplo:

http://127.0.0.1:3000/pedido/remove/6431b5093bbbfe848d4c7bdb

*Retorno esperado - mensagem de confirmação:*

```
{
  "message": "Pedido removido com Sucesso!"
}
```

.

.

### Autor

Crislan Cruz - como projeto final para o Curso de **Backend** da **iTalents**
