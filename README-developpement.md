# abes-hello-front

Version: 0.0.0-SNAPSHOT

Le langage utilisé est TypeScript avec le framework Nuxt

Cette branche de l'application **abes-hello** concerne le front en Nuxt.
Elle est prévue pour fonctionner avec l'api **abes-hello**, disponible à cette adresse :  
https://github.com/abes-esr/abes-hello-back

## Installation et lancement de l'application

### Installation

```
npm install
```

### Lancement de l'application en local

```
npm run dev
```

## Dépendances

L'application utilise **Axios** pour les requêtes http sur l'api, et **Vuetify** pour les composants visuels de l'interface.

## Développements

### Utilisation en local avec Docker

Voir https://github.com/abes-esr/abes-hello-docker qui propose les configurations docker pour déployer en local ou sur des env de dev, test ou prod.

### Publier une nouvelle release de l'application

Se référer à la procédure commune à toutes les applications opensource de l'Abes ici :  
https://github.com/abes-esr/abes-politique-developpement/blob/main/01-Gestion%20du%20code%20source.md#publier-une-nouvelle-release-dune-application

## Structure du projet

La structure adoptée est celle proposée par Nuxt par défaut, avec quelques ajustements inhérents à l'utilisation spécifique de l'Abes.
Voici ci-après le détail des répertoires.

### Assets

Répertoire contenant le fichier `.css` du projet.

### Components

Répertoire contenant tous les composants (*page*) du projet.

### Composables

Répertoire contenant les fichiers gérant les appels http (*via Axios*) vers l'api.

### Docker

Répertoire contenant les fichiers de configuration nécessaire à la dockerisation du projet.

### Layouts

Répertoire contenant le fichier `default.vue` qui permet de structurer les composants principaux du projet (`Header`, `Main`, `Footer`).

### Middleware

Répertoire contenant les fichiers définissant la stratégie d'accès aux différentes pages du projet.

### Pages

Répertoire contenant les fichiers .vue nécessaire au routage dans l'application. 
Chaque fichier fait appel au middleware (voir la section consacrée au middlware) afin de limiter l'accès à certaines pages.

### Plugins

Répertoire contenant le fichier `api.ts` permettant de gérer les erreurs renvoyées par l'api en cas d'indisponibilité de ce dernier.

### Public

Répertoire contenant les images et la favicon.ico

### Server

### Utils

Répertoire contenant le fichier `decodeJwtToken.ts` qui permet de décoder le token.