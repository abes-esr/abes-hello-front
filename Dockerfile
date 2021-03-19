FROM node:lts-alpine as build
WORKDIR /applis
COPY package*.json .
COPY *.js .
COPY src ./src
COPY public ./public
RUN npm install
RUN npm run build

# étape de production
FROM nginx:stable-alpine as front-server
COPY --from=build /applis/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
