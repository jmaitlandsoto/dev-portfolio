FROM node:lts-alpine AS deps
WORKDIR /usr/src/app
COPY package.json package-lock.json* components.json index.html tsconfig.json vite.config.js tailwind.config.js postcss.config.js ./
COPY public ./public/
COPY src ./src
RUN npm ci --silent

FROM deps AS dev
EXPOSE 5173
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "run", "host"]

FROM deps AS build
RUN npm run build

FROM nginx:alpine AS production
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
