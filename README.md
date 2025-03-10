# abes-hello-front

[![build-test-pubtodockerhub](https://github.com/abes-esr/abes-hello-front/actions/workflows/build-test-pubtodockerhub.yml/badge.svg)](https://github.com/abes-esr/abes-hello-front/actions/workflows/build-test-pubtodockerhub.yml) [![Docker Pulls](https://img.shields.io/docker/pulls/abesesr/abes-hello.svg)](https://hub.docker.com/r/abesesr/abes-hello/)

Application exemple type "Hello World" qui illustre la politique de développement de l'Abes avec des modèles pour la partie front en VueJS.

Voir aussi le back ici :  
https://github.com/abes-esr/abes-hello-back

Version: 0.0.0-SNAPSHOT
## Développements

### Utilisation en local avec Docker

Voir https://github.com/abes-esr/abes-hello-docker qui propose les configurations docker pour déployer en local ou sur des env de dev, test ou prod.

### Publier une nouvelle release de l'application

Se référer à la procédure commune à toutes les applications opensource de l'Abes ici :  
https://github.com/abes-esr/abes-politique-developpement/blob/main/01-Gestion%20du%20code%20source.md#publier-une-nouvelle-release-dune-application

### Version fonctionnelle de node avec le projet

Le projet utilise vue2 et vuetify2. Il sera compatible avec node 16, mais pas node 21. Dans le cadre de la maintenance et dans l'attente d'une mise à jour vers la version 3 de l'application
- Télécharger nvm pour windows https://github.com/coreybutler/nvm-windows
- Redémarrer son poste de travail pour que le programme soit pris en compte par les invites de commande
- Faire un nvm install 16, puis nvm 16 (pour changer de version)
- Faire un npm install (supprimer avant le package node module au besoin), puis un npm run serve
