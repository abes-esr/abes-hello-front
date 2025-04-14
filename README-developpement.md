# abes-hello-front

Version: 0.0.0-SNAPSHOT

Le langage utilisé est TypeScript avec le framework Nuxt.

Cette branche de l'application **abes-hello** concerne le front en Nuxt.

**Abes-Hello** fonctionne avec un client et un serveur, les deux gérés par Nuxt. 
Le serveur Nuxt gère les appels vers l'api **abes-hello**, disponible à cette adresse :  
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

Répertoire contenant le fichier **global.css** du projet.

### Components

Répertoire contenant tous les composants (*pages*) du projet.

### Composables

Répertoire contenant les fichiers :[login.post.ts](server/api/login.post.ts)
* **useAuth.ts** qui gère les appels http (*via Axios*) vers le serveur Nuxt et le stockage des informations retournées dans des *states* (variables dynamiques, équivalent au *store* de Pinia).
* **useAPI.ts** qui injecte le plugin **[api.ts](/plugins/api.ts)** (chemin d'accès */plugins/api.ts*)


### Docker

Répertoire contenant les fichiers de configuration nécessaire à la dockerisation du projet.

### Layouts

Répertoire contenant le fichier **default.vue** qui permet de structurer les composants principaux du projet (`Header`, `Main`, `Footer`).
[login.post.ts](server/api/login.post.ts)

### Middleware

Répertoire contenant les fichiers définissant la stratégie d'accès aux différentes pages du projet.
* **user-only.ts** si un utilisateur n'est pas logué, il est redirigé sur la page de *login*
* **guest-only.ts** si un utilisateur est déjà logué, il est redirigé sur la page *account*

### Pages

Répertoire contenant les fichiers `.vue` nécessaires au routage dans l'application. 
Certains fichiers font appel au middleware (voir la section consacrée au *middlware*) afin de limiter l'accès à certaines pages.
C'est dans ces fichiers qu'il faut placer les balises Meta Data pour le référencement (SEO).

### Plugins

Répertoire contenant le fichier **api.ts** permettant de gérer les erreurs renvoyées par l'api en cas d'indisponibilité de ce dernier.

### Public

Répertoire contenant les images et la favicon.ico

### Server

Répertoire qui contient les fichiers :
* **login.post.ts** qui intercepte les appels http (*via Axios*) émis depuis **useAuth.ts**, puis qui appelle l'api (*abes-hello-back*), et inscrits le token dans les cookies
* **logout.post.ts** qui intercepte les appels http (*via Axios*) émis depuis **useAuth.ts**, puis qui supprime les cookies
* **me.get.ts** qui intercepte les appels http (*via Axios*) émis depuis **useAuth.ts**, et qui vérifie l'existence d'un token dans les cookies
* **register.post.ts** qui intercepte les appels http (*via Axios*) émis depuis **useAuth.ts**, et qui enregistre l'utilisateur auprès de l'api

### Utils

Répertoire contenant le fichier **decodeJwtToken.ts** qui permet de décoder le token.