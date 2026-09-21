FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json* components.json index.html tsconfig.json vite.config.js tailwind.config.js postcss.config.js ./
COPY public ./public/
COPY src ./src
RUN npm install --silent
EXPOSE 5173
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "run", "host"]
