FROM node:alpine

WORKDIR /employees

COPY package.json .

RUN npm install --quiet

RUN npm install nodemon -g --quiet

RUN npx sequelize db:migrate

COPY . . 

EXPOSE 4000

CMD nodemon -L --watch . index.js