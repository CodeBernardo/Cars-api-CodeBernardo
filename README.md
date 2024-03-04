# Cars-api-CodeBernardo

## Cadastro de um carro

- **Rota**: POST `/cars`
- **Descrição**: Cria um novo cadastro de um carro.
- **Parâmetros**:
  - `body`: Um objeto JSON contendo os detalhes do carro a ser criado.
- **Exemplo de Requisição**:

```json
{
  "name": "Car name",
  "description": "Car description",  // optional key
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

## Leitura dos carros cadastrados

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

## Buscar um carro específico

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

## Atualizar um carro

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
      "message": "Expected string, received number",
    },
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