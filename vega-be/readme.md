Требования
- node v22
- docker with postgreSQL

Установка:
- cd vega-be
- create .env file in root (example):
```
PORT=3001
PRISMA_ENGINES_HTTP_PORT=0
POSTGRES_USER="some_username"
POSTGRES_PASSWORD="some_password"
DATABASE_URL="postgresql://some_username:some_password@localhost:5432/vegadbv2?schema=public"
JWT_SECRET="some_secret"
```
to generate JWT_SECRET you need to execute
```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
```
copy console output to JWT_SECRET
- yarn
- cd docker
- docker-compose up
- docker exec -it vega-database psql -U admin
- CREATE DATABASE vegadbv2;
- npx prisma migrate dev
- npx prisma db seed
- yarn dev
