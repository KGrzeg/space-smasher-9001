FROM node:18-alpine

RUN apk add g++ make py3-pip

RUN mkdir -p /usr/app
WORKDIR /usr/app

ENV API_PATH="/api"

COPY game/package*.json ./
RUN npm install --quite

COPY game .
RUN npm run build

FROM node:18-alpine
RUN mkdir -p /usr/app/public
WORKDIR /usr/app

ENV STATIC="/usr/app/public"
ENV PORT=80
EXPOSE 80/tcp

COPY --from=0 /usr/app/dist ./public

COPY server/package*.json ./
RUN npm install --quite

COPY server .
COPY ./run.sh .

CMD ./run.sh

