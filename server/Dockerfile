FROM node:16.8.0-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:16.8.0-alpine

COPY --from=builder /usr/src/app/build /usr/src/app
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules

WORKDIR /usr/src/app

ENTRYPOINT ["node"]
CMD [ "app.js" ]
