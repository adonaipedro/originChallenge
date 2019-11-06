## Projeto Origin

### Instalação
- git clone https://github.com/adonaipedro/originChallenge.git
- npm install
- npm start

### Estrutura
O projeto foi estruturado da seguinte forma:
- app.js : Ponto de entrada da aplicação.
- /routes : Diretório com as rotas do projeto.
- /validations : Diretório com as validações das rotas.
- /controllers : Diretório com os controllers do projeto (controllers neste projeto são usados para organizar um request específico, construindo a response do mesmo).
- riskRules.js : Implementação das regras desse desafio (1 à 10).

### Exemplo de chamada da api:
POST http://localhost:3000/analysis
body:

{
  "age": 35,
  "dependents": 2,
  "houses": [
    {"key": 1, "ownership_status": "owned"},
    {"key": 2, "ownership_status": "mortgaged"}
  ],
  "income": 0,
  "marital_status": "married",
  "risk_questions": [0, 1, 0],
  "vehicles": [
    {"key": 1, "year": 2018}
  ]
}