FROM node:lts-alpine
WORKDIR /app
COPY package.json ./
COPY src ./src

ARG GIT_SHA=""
ARG BUILD_TIME=""
ENV GIT_SHA=$GIT_SHA \
    BUILD_TIME=$BUILD_TIME \
    NODE_ENV=production

USER node
EXPOSE 3300
CMD ["node", "src/server.js"]
