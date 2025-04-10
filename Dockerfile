FROM node:20-alpine3.19 as build
WORKDIR /usr/app
COPY . /usr/app
RUN npm ci
RUN npm run build
 
FROM nginx:alpine
EXPOSE 80
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/build /usr/share/nginx/html