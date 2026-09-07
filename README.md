# SCTech-ClinicaMedica

## Como executar

É necessário ter o Node.js instalado. Na raiz do projeto, execute:

```bash
cd clinica/src
npm install
npm run build
npm start
```

O servidor será iniciado em `http://localhost:3000`.

Rotas disponíveis:

- `GET /`: confirma que a API está disponível.
- `GET /health`: retorna o status de saúde da aplicação.

Para usar outra porta, defina a variável `PORT` antes de iniciar:

```bash
PORT=4000 npm start
```