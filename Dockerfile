###
# Phase de compilation de l'appli vuejs
FROM node:16.14.0 AS build-image
WORKDIR /build/
# Mise en cache docker pour le téléchargement
# des dépendances npm (répertoire node_modules/)
COPY ./package*.json /build/
# si on a un node_modules/ local on peut décommenter la ligne suivante pour 
# éviter que npm retélécharge toutes les dépendances
#COPY ./node_modules/ /build/node_modules/
RUN npm install

# Compilation du TS en JS compilé
# en injectant des placeholders dans les variables .env de vuejs
# (cf le fichier docker/vuejs_env_placeholder) pour pouvoir créer des conteneurs
# en dev, test, prod ou en local en passant les valeurs de ce .env
# via des variables d'environement Docker
# Par exemple, cela permet d'injecter l'URL où se trouvent les API (back) différente
# si on est en dev, test ou prod ou local.
COPY ./docker/vuejs_env_placeholder /build/.env
#COPY ./.browserslistrc              /build/.browserslistrc
#COPY ./.eslintrc.js                 /build/.eslintrc.js
COPY ./*.js                         /build/
COPY ./*.json                       /build/
COPY ./src/                         /build/src/
COPY ./public/                      /build/public/
RUN npm run build

# On s'assure que le docker-entrypoint soit bien compréhensible et executable par linux
# Lié au problème de CRLF->LF notamment par l'édition dans Windows
COPY ./docker/docker-entrypoint.sh /docker-entrypoint.sh
RUN apt-get update && apt-get install -y dos2unix
RUN dos2unix /docker-entrypoint.sh

###
# Serveur web (nginx) pour exec l'appli vuejs
FROM nginx:1.20.2 AS front-image
COPY --from=build-image /build/dist/ /usr/share/nginx/html.orig/
COPY ./docker/nginx-default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-image /docker-entrypoint.sh /docker-entrypoint.sh
ENTRYPOINT ["bash", "/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
