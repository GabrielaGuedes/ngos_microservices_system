#!/bin/sh
npx sequelize db:migrate
npx sequelize-cli db:migrate --url 'postgres://postgres:postgres@postgres_db/volunteers_test'
nodemon -L --watch . index.js
