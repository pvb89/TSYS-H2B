FROM nginx:alpine
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY  ./src /usr/share/nginx/html
EXPOSE 82
ENTRYPOINT ["nginx", "-g", "daemon off;"]