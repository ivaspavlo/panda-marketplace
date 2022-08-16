FROM node:16-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install --legacy-peer-deps

COPY . /app

EXPOSE 4200

RUN npm run build --prod



FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/banda-panda-ui /usr/share/nginx/html