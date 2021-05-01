FROM node:alpine

WORKDIR /projects

COPY package.json .

RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY . . 

EXPOSE 6000

ENTRYPOINT [ "./init.sh" ]
