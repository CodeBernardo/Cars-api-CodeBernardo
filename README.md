# Cars API - CodeBernardo

## Apresentação

Neste projeto de estudo, desenvolvi uma API robusta e eficiente para gerenciar um estoque de carros, utilizando uma combinação de tecnologias modernas e poderosas: Express para a criação do servidor, Prisma como ORM para facilitar a interação com o banco de dados, e TypeScript para garantir a tipagem estática e melhorar a qualidade do código. A escolha dessas tecnologias foi motivada pela necessidade de criar uma API escalável, segura e de fácil manutenção.

Além do desenvolvimento da API, dediquei um esforço significativo para garantir a qualidade do código através de uma série de testes unitários e de integração. Utilizei o Jest, uma ferramenta de teste amplamente utilizada e confiável, para criar testes que cobrem tanto a lógica de negócios quanto as interações com o banco de dados. Esses testes são cruciais para garantir que a API funcione conforme esperado e para facilitar a detecção e correção de bugs antes que eles afetem os usuários finais.

Este projeto não só me permitiu aplicar e aprofundar meus conhecimentos em desenvolvimento de APIs e testes automatizados, mas também me proporcionou uma compreensão mais profunda de como criar sistemas robustos e escaláveis.

## Inicialização do projeto

1. **_Node Version_**: v20.9.0^.
2. **_Npm Version_**: 10.1.0^.
3. **_Clone este repositório_**
4. **_Instalação de dependencias_**: `npm install`
5. **_Variáveis de ambiente_**: Serão necessários dois arquivos com as variáveis de ambiente, um contendo as variáveis do ambiente de desenvolvimento, `.env.dev`, e o outro as variáveis do ambiente de teste, `.env.test`, sobrescreva o conteúdo dos dois arquivos com as informações contidas no arquivo `.env.test` fornecendo suas credênciais.
6. **_Migrações_**: Execute as migrações com os comandos: `npm run migrate:dev` e `npm migrate:test`.
7. **_Rodar aplicação_**: Execute o comando `npm run dev`.
8. **_Rodar testes_**: Execute o comando `npm run test`.

## Features

### Cadastro de usuários

- **Rota**: POST `/users`
- **Descrição**: Cria um novo cadastro de usuário.
- **Parâmetros**:
  - `body`: Um objeto JSON contendo as credenciais do usuário a ser criado.
- **Exemplo de requisição**:

```json
{
  "name": "Jhon doe",
  "email": "jhondoe@email.com",
  "password": "123456"
}
```

- **Exemplo de resposta**:
  - **Status Code**: `201 Created`
  - **Retorna o usuário cadastrado**

```json
{
  "id": "3c86bcc9-87c8-42fc-91e2-b7a5adfd905f",
  "name": "Jhon doe",
  "email": "jhondoe@email.com"
}
```

- **Exemplo de resposta de corpo inválido**:
  - **Status Code**: `400 Bad Request`
  - **Retorna um erro de validação**

```json
{
  "message": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["name"],
      "message": "Required"
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["email"],
      "message": "Required"
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["password"],
      "message": "Required"
    }
  ]
}
```

- **Exemplo de resposta de email já cadastrado**:
  - **Status Code**: `409 Conflict`
  - **Retorna um erro de validação**

```json
{
  "message": "E-mail already registered"
}
```

---

### Login de usuários

- **Rota**: POST `/users/login`
- **Descrição**: Gera um token de autenticação.
- **Parâmetros**:
  - `body`: Um objeto JSON contendo as credenciais do usuário.
- **Exemplo de requisição**:

```json
{
  "email": "jhondoe@email.com",
  "password": "123456"
}
```

- **Exemplo de resposta**:
  - **Status Code**: `200 Accepted`
  - **Retorna um token**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicGVkcm8iLCJlbWFpbCI6InBlZHJvQG1haWwuY29tIiwiaWF0IjoxNzEwNTEwOTUwLCJleHAiOjE3MTA1MTQ1NTAsInN1YiI6IjUxN2I2M2UwLTdhYjktNDgzMC1hNTVmLTA4MzIyYzI3YTk0YyJ9.Pdm2y5OI8f7hfGE2-gaLJyXiGwSqemoETP3ftVRVkdg",
  "user": {
    "id": "3c86bcc9-87c8-42fc-91e2-b7a5adfd905f",
    "name": "jhon doe",
    "email": "jhondoe@email.com"
  }
}
```

- **Exemplo de resposta de credenciais inválidas ou inexistentes**:
  - **Status Code**: `401 Unauthorized`
  - **Retorna um erro de validação**

```json
{
  "message": "Invalid credentials"
}
```

- **Exemplo de resposta de corpo inválido**:
  - **Status Code**: `400 Bad request`
  - **Retorna um erro de validação**

```json
{
  "message": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["email"],
      "message": "Required"
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["password"],
      "message": "Required"
    }
  ]
}
```

---

### Retornar perfil de usuário

- **Rota**: GET `/users`
- **Descrição**: Retorna os dados do usuário logado.
- **Parâmetros**:
  - `header "Authorization"`
  - `Bearer token`: uma string contendo um token válido.
- **Exemplo de resposta**:
  - **Status Code**: `200 Accepted`
  - **Retorna um usuário**

```json
{
  "id": "0cf579b3-db9f-4667-b513-ef6e51afef98",
  "name": "John Doe",
  "email": "johndoe@email.com"
}
```

- **Exemplo de resposta de token inválido**:
  - **Status Code**: `401 Unauthorized`
  - **Retorna retorna um erro de validação**

```json
{
  "message": "Token is required"
}
```

```json
{
  "message": "Jwt malformed"
}
```

```json
{
  "message": "jwt expired"
}
```

---

### Cadastro de um carro

- **Rota**: POST `/cars`
- **Descrição**: Cria um novo cadastro de um carro.
- **Parâmetros**:
  - `header "Authorization"`
  - `Bearer token`: uma string contendo um token válido.
  - `body`: Um objeto JSON contendo os detalhes do carro a ser criado.
- **Exemplo de requisição**:

```json
{
  "name": "Car name",
  "description": "Car description", // optional key
  "brand": "Card brand",
  "year": 2023,
  "km": 10000
  // userId é recuperado através do token
}
```

- **Exemplo de resposta**:
  - **Status Code**: `201 Created`
  - **Retorna o carro cadastrado**

```json
{
  "id": "bd9b947c-4622-4a39-b394-88dde0135cdd",
  "name": "Car name",
  "description": "Car description",
  "brand": "Card brand",
  "year": 2023,
  "km": 10000,
  "userId": "0cf579b3-db9f-4667-b513-ef6e51afef98"
}
```

- **Exemplos de resposta de token inválido**:
  - **Status Code**: `401 Unauthorized`
  - **Retorna um erro de validação**

```json
{
  "message": "Token is required"
}
```

```json
{
  "message": "Jwt malformed"
}
```

```json
{
  "message": "jwt expired"
}
```

---

### Leitura dos carros cadastrados

- **Rota**: GET `/cars`
- **Descrição**: lista todos os carros registrados ou todos os carros de um usuário específico.
- **Parâmetros**:
  - `id`: O ID de um usuário existente. Este parâmetro é opcional.
- **Exemplo de resposta**:
  - **Status code**: `200 OK`
  - **Retorna uma lista de todos os carros cadastrados**

```json
[
  {
    "id": "bd9b947c-4622-4a39-b394-88dde0135cdd",
    "name": "Car name",
    "description": "Car description",
    "brand": "Card brand",
    "year": 2023,
    "km": 10000,
    "userId": "0cf579b3-db9f-4667-b513-ef6e51afef98"
  }
]
```

---

### Buscar um carro específico

- **Rota**: GET `/cars/:id`
- **Descrição**: recupera um carro específico pelo ID.
- **Parâmetros**:
  - `id`: O ID do carro a ser recuperado.
- **Exemplo de resposta**:
  - **Status code**: `200 OK`
  - **Retorna o carro encontrado**

```json
{
  "id": "bd9b947c-4622-4a39-b394-88dde0135cdd",
  "name": "Car name",
  "description": "Car description",
  "brand": "Card brand",
  "year": 2023,
  "km": 10000,
  "userId": "0cf579b3-db9f-4667-b513-ef6e51afef98"
}
```

- **Exemplo de resposta id inválido**:
  - **Status Code**: `404 Not Found`
  - **Retorna uma mensagem de erro**

```json
{
  "message": "Car not found."
}
```

### Atualizar um carro

- **Rota**: PATCH `/cars/:id`
- **Descrição**: Atualiza um carro específico por ID.
- **Parâmetros**:
  - `header "Authorization"`
  - `Bearer token`: uma string contendo um token válido.
  - `id`: O ID do carro a ser atualizado.
  - `body`: Um objeto JSON contendo os detalhes do carro a ser atualizado.
- **Exemplo de requisição**:

```json
{
  "name": "Car name UPDATED"
}
```

- **Exemplo de resposta**:
  - **Status Code**: `200 OK`
  - **Retorna o carro atualizado**

```json
{
  "id": "bd9b947c-4622-4a39-b394-88dde0135cdd",
  "name": "Car name UPDATED",
  "description": "Car description",
  "brand": "Car brand",
  "year": 2023,
  "km": 10000
}
```

- **Exemplo de resposta id invalido**:
  - **Status Code**: `404 Not Found`
  - **Retorna uma mensagem de erro**

```json
{
  "message": "Car not found."
}
```

- **Exemplo de resposta parametros de corpo inválidos**:
  - **Status Code**: `400 Bad Request`
  - **Retorna uma mensagem de erro de validação**

```json
{
  "message": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "number",
      "path": ["name"],
      "message": "Expected string, received number"
    }
  ]
}
```

- **Exemplos de resposta de token inválido**:
  - **Status Code**: `401 Unauthorized`
  - **Retorna um erro de validação**

```json
{
  "message": "Token is required"
}
```

```json
{
  "message": "Jwt malformed"
}
```

```json
{
  "message": "jwt expired"
}
```

---

### Deletar um carro

- **Rota**: DELETE `/cars/:id`
- **Descrição**: Exclui um carro específico por ID.
- **Parâmetros**:
  - `header "Authorization"`
  - `Bearer token`: uma string contendo um token válido.
  - `id`: O ID do carro a ser excluído.
- **Exemplo de resposta**:
  - **Status code**: `204 No Content`
- **Exemplo de resposta id invalido**:
  - **Status code**: `404 Not found`
  - **Retorna uma mensagem de erro**:

```json
{
  "message": "Car not found."
}
```
- **Exemplos de resposta de token inválido**:
  - **Status Code**: `401 Unauthorized`
  - **Retorna um erro de validação**

```json
{
  "message": "Token is required"
}
```

```json
{
  "message": "Jwt malformed"
}
```

```json
{
  "message": "jwt expired"
}
```