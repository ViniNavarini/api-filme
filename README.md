# API busca intervalos de premiações de filmes

## Como instalar e executar

1. Instale as dependências: `npm install`
2. Execute a aplicação: `npm start` - o arquivo csv que estiver em src/movielist.csv será gravado no banco de dados
3. Excutar teste de intervalos com valores que estão no banco de dados `npm test -- test.js`

## Rotas
1. `GET` http://localhost:3000/api/awards - retorna os maiores e menores intervalos de premiações
