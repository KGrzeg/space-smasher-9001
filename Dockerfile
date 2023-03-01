FROM node:18
RUN mkdir -p /usr/app
WORKDIR /usr/app

ENV API_PATH="/api"

COPY game/package*.json ./
RUN npm install --quite

COPY game .
RUN npm run build

FROM node:18
RUN mkdir -p /usr/app/public
WORKDIR /usr/app

ENV STATIC="/usr/app/public"
ENV PORT=80
EXPOSE 80/tcp

COPY --from=0 /usr/app/dist ./public

COPY server/package*.json ./
RUN npm install --quite

COPY server .
RUN mkdir -p storage
RUN cp .env.example .env
RUN sed -i "s#HVuwh1dmaFhg4q1fef7xI4D6UeV7ImGK6NTp7i9eH6qiyJ9kxsvqPu29JXnhNGQY#$(head -c 12 /dev/random | base64)#" .env

CMD ["npm", "run", "start"]
