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

### Cadastro de um carro

- **Rota**: POST `/cars`
- **Descrição**: Cria um novo cadastro de um carro.
- **Parâmetros**:
  - `body`: Um objeto JSON contendo os detalhes do carro a ser criado.
- **Exemplo de Requisição**:

```json
{
  "name": "Car name",
  "description": "Car description", // optional key
  "brand": "Card brand",
  "year": 2023,
  "km": 10000
}
```

- **Exemplo de Resposta**:
  - **Status Code**: `201 Created`
  - **Retorna o carro cadastrado**

```json
{
  "id": "bd9b947c-4622-4a39-b394-88dde0135cdd",
  "name": "Car name",
  "description": "Car description",
  "brand": "Card brand",
  "year": 2023,
  "km": 10000
}
```

---

### Leitura dos carros cadastrados

- **Rota**: GET `/cars`
- **Descrição**: lista todos os carros registrados.
- **Parâmetros**: Nenhum.
- **Exemplo de Resposta**:
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
    "km": 10000
  }
]
```

---

### Buscar um carro específico

- **Rota**: GET `/cars/:id`
- **Descrição**: recupera um carro específico pelo ID.
- **Parâmetros**:
  - `id`: O ID do carro a ser recuperado.
- **Exemplo de Resposta**:
  - **Status code**: `200 OK`
  - **Retorna o carro encontrado**

```json
{
  "id": "bd9b947c-4622-4a39-b394-88dde0135cdd",
  "name": "Car name",
  "description": "Car description",
  "brand": "Card brand",
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

### Atualizar um carro

- **Rota**: PATCH `/cars/:id`
- **Descrição**: Atualiza um carro específico por ID.
- **Parâmetros**:
  - `id`: O ID do carro a ser atualizado.
  - `body`: Um objeto JSON contendo os detalhes do carro a ser atualizado.
- **Exemplo de Requisição**:

```json
{
  "name": "Car name UPDATED"
}
```

- **Exemplo de Resposta**:
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

- **Exemplo de resposta parametros de corpo invalidos**:
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

---

### Deletar um carro

- **Rota**: DELETE `/cars/:id`
- **Descrição**: Exclui um carro específico por ID.
- **Parâmetros**:
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
