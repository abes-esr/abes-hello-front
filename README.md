# abes-hello-front


Application exemple qui illustre notre politique de développement avec des modèles pour la partie front en VueJS



## Utilisation en local avec docker

### Génération des images docker

L'image docker de abes-hello-front est générée automatiquement à chaque ``git push`` par la [chaîne d'intégration continue](https://github.com/abes-esr/abes-hello-front/actions/workflows/build-test-pubtodockerhub.yml). Les images suivantes sont [disponibles sur dockerhub](https://hub.docker.com/r/abesesr/abes-hello/tags) :
- ``abesesr/abes-hello:main-front`` : l'image du dernier git push sur la branche ``main``
- ``abesesr/abes-hello:develop-front`` : l'image du dernier git push sur la branche ``develop``
- ``abesesr/abes-hello:X.X.X-front`` : l'image dont le n° de version est ``X.X.X``
- ``abesesr/abes-hello:latest-front`` : l'image de la dernière version publiée

Il est aussi possible de générer cette image localement en tapant la commande suivante :
```bash
cd abes-hello-front/
docker build . -t abesesr/abes-hello:develop-front

```

### Démarrage du conteneur docker

Pour un déploiement dans le SI de l'Abes, il faut se référer aux configurations suivantes :
https://git.abes.fr/depots/abes-hello-docker/

Pour le déployer en local sur sa machine, une fois la génération de l'images terminée (cf section au dessus), voici les commandes que l'on peut utiliser (TODO, cette partie pourrait être améliorée en proposant un ``docker-compose.yml``):
```bash
# on suppose ci-dessous que l'URL de abes-hello-back est sur http://127.0.0.1:8080/v1/
docker run -d \
  --name abes-hello-front \
  -p 8081:80 \
  -e ABESHELLO_VUE_APP_ROOT_API="http://127.0.0.1:8080/v1/" \
  -e ABESHELLO_VUE_APP_RECAPTCHA_KEY_SITE="6LcjHroaAAAAAOhO6sd_1ooz5LfcyRPoYirqxsFt" \
  abesesr/abes-hello:latest-front
```

Pour consulter les logs :
```bash
docker logs -n 100 -f abes-hello-front
```
