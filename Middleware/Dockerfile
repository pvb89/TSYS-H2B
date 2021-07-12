FROM node:12.18-buster-slim As development
WORKDIR /usr/src/app
RUN apt-get update && \ 
    apt-get install -y build-essential \
    wget \
    python3 \
    make \
    gcc \ 
    libc6-dev
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
COPY ./src/images ./build/images
COPY ./src/model ./build/model
EXPOSE 3000
CMD ["node", "build/main"]