FROM node:alpine

WORKDIR /employees

COPY package.json .

RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY . . 

EXPOSE 4000

ENTRYPOINT [ "./init.sh" ]