FROM node:5.3-slim

RUN mkdir src/

COPY . /src

RUN cd /src; npm install; npm run deploy

ENV NODE_ENV production

expose 3000

CMD ["node", "/src/server.js"]
