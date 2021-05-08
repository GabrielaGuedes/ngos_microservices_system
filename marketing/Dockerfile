FROM node:alpine

WORKDIR /marketing

COPY package.json .

RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY . . 

EXPOSE 8000

ENTRYPOINT [ "./init.sh" ]
