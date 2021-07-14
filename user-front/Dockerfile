FROM node:alpine

WORKDIR /user-front

COPY package*.json ./

RUN npm install --quiet

RUN npm install react-scripts@3.3.1 -g --quiet

COPY . . 

EXPOSE 13000

CMD ["npm", "start"]
