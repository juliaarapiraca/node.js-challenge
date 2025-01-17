## API REST - Meu Controle de Gastos (por Júlia Menezes Arapiraca)

### LINK DO DEPLOY: https://meu-controle-de-gastos.herokuapp.com

Essa API REST foi criada como desafio técnico e parte do processo seletivo para a empresa Kinvo, usando JavaScript e NodeJS, assim como as bibliotecas dotenv, express, jsonwebtoken, knex, pg, secure-password, yup, yup-locales e nodemon. Ela possui as seguintes funcionalidades:

### Cadastro de Usuário (`POST` `/usuario`):
#### Essa é a rota que será utilizada para cadastrar um novo usuário no sistema.
- Para cadastrar um usuário, é obrigatório informar nome, email e senha; 
- O email de dois usuários não pode ser igual;
- A senha deve ter no mínimo 6 dígitos;
- Os dados acima deverão ser informados no body da aplicação através de um objeto com a seguinte estrutura:
```javascript
{  
    "nome": "Seu Nome",
    "email": "seuemail@email.com",
    "senha": "suasenha"
}
```

### Login (`POST` `/login`):
#### Essa é a rota que permite o usuario cadastrado realizar o login no sistema.
- Para fazer o login, é necessário informar o email e senha corretos, os mesmos usados ao fazer o cadastro do usuário;
- Os dados acima deverão ser informados no body da aplicação através de um objeto com a seguinte estrutura:
```javascript
{
    "email": "seuemail@email.com",
    "senha": "suasenha"
}
```

### Criação da movimentação (`POST` `/movimentacao`):
#### Essa é a rota que será utilizada para criar uma movimentação associada ao usuário logado.
- Para criar uma movimentação, é preciso informar descrição, valor, data e tipo (receita ou despesa);
- Os dados acima deverão ser informados no body da aplicação através de um objeto com a seguinte estrutura:
```javascript
{
    "descricao": "descricao da movimentação",
    "valor": "valor da movimentação",
    "data": "data da movimentação",
    "tipo": "tipo da movimentação"
}
```

### Atualização da movimentação (`PUT` `/movimentacao/:id`):
#### Essa é a rota que será chamada quando o usuário logado quiser atualizar uma das suas movimentações já criadas.
- Para atualizar uma movimentação, deve ser enviado o ID da mesma no parâmetro de rota do endpoint;
- Os dados a serem atualizados deverão ser informados no body da aplicação através de um objeto com a seguinte estrutura:
```javascript
{
    "descricao": "descricao da movimentação",
    "valor": "valor da movimentação",
    "data": "data da movimentação",
    "tipo": "tipo da movimentação"
}
```

### Exclusão da movimentação (`DELETE` `/movimentacao/:id`):
#### Essa é a rota que será chamada quando o usuario logado quiser excluir uma das suas movimentações já criadas.
- Deverá ser enviado o ID da movimentação no parâmetro de rota do endpoint.

### Listagem de movimentações (`GET` `/movimentacao`):
#### Essa é a rota que será chamada quando o usuário logado quiser listar todas as suas movimentações já criadas.

### Exibição de saldo (`GET` `/movimentacao/saldo`):
#### Essa é a rota que será chamada quando o usuario logado quiser obter o saldo de todas as suas receitas cadastradas.