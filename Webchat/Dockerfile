FROM node:12.18-alpine as development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:webpack

FROM nginx:alpine as production
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY  --from=development /usr/src/app/dist/ /usr/share/nginx/html
EXPOSE 81
ENTRYPOINT ["nginx", "-g", "daemon off;"]