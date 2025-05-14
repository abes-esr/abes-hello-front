# abes-hello-front

Version: 0.0.0-SNAPSHOT

Le langage utilisé est TypeScript avec le framework Nuxt.

Cette branche de l'application **abes-hello** concerne le front en Nuxt.

**Abes-Hello** fonctionne avec un client et un serveur, les deux gérés par Nuxt [(doc officielle)](https://nuxt.com/docs/getting-started/introduction).
Le serveur Nuxt gère les appels vers l'api **abes-hello**, disponible à cette adresse :  
https://github.com/abes-esr/abes-hello-back


## Architecture du projet

![](public/pictures/Hello-Abes-Fonrt-Nuxt.svg)

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

La structure adoptée est celle proposée par Nuxt par défaut [(doc officielle)](https://nuxt.com/docs/guide/directory-structure/app), avec quelques ajustements inhérents à l'utilisation spécifique de l'Abes.
Voici ci-après le détail des répertoires.

### Assets

Le répertoire assets/ est utilisé pour ajouter tous les actifs du site Web que l'outil de création traitera.

Répertoire contenant le fichier **global.css** du projet.

### Components

Le répertoire components/ est l'endroit où vous placez tous vos composants Vue.

Répertoire contenant tous les composants (_pages_) et (_layouts_) du projet.

### Composables

Utilisez le répertoire composables/ pour importer automatiquement vos composables Vue dans votre application.
Dans le contexte des applications Vue, un "composable" est une fonction qui exploite la Composition API (variables dynamiques / réactivité) de Vue pour encapsuler et réutiliser une logique avec état. [(doc officielle)](https://fr.vuejs.org/guide/reusability/composables)

Répertoire contenant les fichiers:

- **useAuth.ts** qui gère l'authentification de l'application notamment via les appels vers le serveur Nuxt.
- **useSpringbootApi.ts** qui injecte le plugin **[springbootApi.ts](/plugins/springbootApi.ts)** (chemin d'accès _/plugins/springbootApi.ts_)
- **useNuxtApi.ts** qui injecte le plugin **[nuxtApi.ts](/plugins/nuxtApi.ts)** (chemin d'accès _/plugins/nuxtApi.ts_)

### Docker

Répertoire contenant les fichiers de configuration nécessaire à la dockerisation du projet.

### Layouts

Nuxt fournit un framework de mise en page pour extraire des modèles d'interface utilisateur courants dans des mises en page réutilisables.

Répertoire contenant le fichier **default.vue** qui permet de structurer les composants principaux du projet (`Header`, `Main`, `Footer`).

### Middleware

Nuxt fournit un middleware pour exécuter du code avant de naviguer vers un itinéraire particulier.

Répertoire contenant les fichiers définissant la stratégie d'accès aux différentes pages du projet.

- **user-only.ts** si un utilisateur n'est pas logué, il est redirigé sur la page de _login_
- **guest-only.ts** si un utilisateur est déjà logué, il est redirigé sur la page _account_

### Pages

Nuxt fournit un routage basé sur des fichiers pour créer des itinéraires au sein de votre application Web.

Répertoire contenant les fichiers `.vue` nécessaires au routage dans l'application.

Certains fichiers font appel au middleware (voir la section consacrée au _middlware_) afin de limiter l'accès à certaines pages.
C'est dans ces fichiers qu'il faut placer les balises Meta Data pour le référencement (SEO).

### Plugins

Nuxt dispose d'un système de plugins pour utiliser les plugins Vue et plus encore lors de la création de votre application Vue.

Répertoire contenant les fichiers

- **nuxtApi.ts** permettant de personnaliser l'instance Axios (gérer les erreurs...).
- **springbootApi.ts** permettant de personnaliser l'instance Axios (gérer les erreurs, token d'authentification...).

### Public

Le répertoire public/ est utilisé pour servir les ressources statiques de votre site Web.

Répertoire contenant les images et la favicon.ico

### Server

Le répertoire server/ est utilisé pour enregistrer les gestionnaires d'API et de serveur dans votre application.

Répertoire qui contient les fichiers :

- **login.post.ts** qui intercepte les appels http (_via Axios_) émis depuis **useAuth.ts**, puis qui appelle l'api (_abes-hello-back_), et inscrits le token dans les cookies
- **logout.post.ts** qui intercepte les appels http (_via Axios_) émis depuis **useAuth.ts**, puis qui supprime les cookies
- **me.get.ts** qui intercepte les appels http (_via Axios_) émis depuis **useAuth.ts**, et qui vérifie l'existence d'un token dans les cookies
- **register.post.ts** qui intercepte les appels http (_via Axios_) émis depuis **useAuth.ts**, et qui enregistre l'utilisateur auprès de l'api

### Utils

Utilisez le répertoire utils/ pour importer automatiquement vos fonctions utilitaires dans toute votre application.

Répertoire contenant le fichier **decodeJwtToken.ts** qui permet de décoder le token.
