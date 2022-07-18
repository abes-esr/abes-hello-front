#!/bin/bash

# Paramètres par défaut du conteneur
export ABESHELLO_VUE_APP_ROOT_API=${ABESHELLO_VUE_APP_ROOT_API:='http://localhost:8081/'}
export ABESHELLO_VUE_APP_RECAPTCHA_SITEKEY=${ABESHELLO_VUE_APP_RECAPTCHA_SITEKEY:='6LdPnOogAAAAAAKq2_wCCLQvUIwI8KH6UTbjEzcI'} 

# Remplace les placeholders dans le code généré en prod
# ABESHELLO_PLACEHOLDER_VUE_APP_ROOT_API et ABESHELLO_PLACEHOLDER_VUE_APP_RECAPTCHA_SITEKEY
# On va remplacer les placeholders depuis les JS originales
echo "-> Remplacement des placeholders venant du .env de vuejs dans la destination /usr/share/nginx/html/"
echo "-> ABESHELLO_VUE_APP_ROOT_API=${ABESHELLO_VUE_APP_ROOT_API}"
rm -rf /usr/share/nginx/html/
cp -rf /usr/share/nginx/html.orig/ /usr/share/nginx/html/
sed -i \
  "s#ABESHELLO_PLACEHOLDER_VUE_APP_ROOT_API#${ABESHELLO_VUE_APP_ROOT_API}#g" \
  /usr/share/nginx/html/js/*
sed -i \
  "s#ABESHELLO_PLACEHOLDER_VUE_APP_RECAPTCHA_SITEKEY#${ABESHELLO_VUE_APP_RECAPTCHA_SITEKEY}#g" \
  /usr/share/nginx/html/js/*

# execute nginx (cf CMD dans Dockerfile)
exec "$@"
