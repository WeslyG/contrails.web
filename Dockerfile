FROM node:latest AS build-env

ADD . /app

WORKDIR /app

RUN yarn install && yarn run build


# build runtime image
FROM nginx:latest

WORKDIR /usr/share/nginx/html
COPY --from=build-env /app/dist /usr/share/nginx/html
