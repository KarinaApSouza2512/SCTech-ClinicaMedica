# SCTech-ClinicaMedica

## Como executar

É necessário ter o Node.js instalado. Na raiz do projeto, execute:

```bash
docker compose -f clinica/postgress/docker-compose.yml up -d
cd clinica/src
npm install
npm run build
npm start
```

A aplicação conecta ao PostgreSQL em `localhost:5434` por padrão. Para usar outra
configuração, defina `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD` e `DB_NAME`.

O servidor será iniciado em `http://localhost:3000`.

Rotas disponíveis:

- `GET /`: confirma que a API está disponível.
- `GET /health`: retorna o status de saúde da aplicação.

Para usar outra porta, defina a variável `PORT` antes de iniciar:

```bash
PORT=4000 npm start
```