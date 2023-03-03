#!/bin/sh

mkdir -p storage

if [ ! -f ".env" ]; then
  cp .env.example .env
  sed -i "s#HVuwh1dmaFhg4q1fef7xI4D6UeV7ImGK6NTp7i9eH6qiyJ9kxsvqPu29JXnhNGQY#$(head -c 12 /dev/random | base64)#" .env
fi

npm run start

