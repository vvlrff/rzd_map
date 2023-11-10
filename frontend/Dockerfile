FROM node:18.16.0

WORKDIR /user/src/app

COPY ./package.json ./

RUN npm i vite
RUN npm install 

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
