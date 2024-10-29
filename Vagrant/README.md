# Projet Kakeibo API (Vagrant)

Ce projet utilise Vagrant pour créer un environnement de développement local, installer les dépendances nécessaires et exécuter les conteneurs Docker pour l'application Kakeibo.

## Prérequis

- ✅ [Vagrant](https://www.vagrantup.com/downloads)
- ✅ [VirtualBox](https://www.virtualbox.org/)
- ✅ [Git](https://git-scm.com/)

## Configuration de l'environnement

**Clonez ce dépôt :**

```bash
git clone https://github.com/BriceSensei/kakeibo_api.git
```
```bash
cd kakeibo_api
```

##  Lancez la machine virtuelle avec Vagrant :

- Sur Windows : Exécutez
```bash
launch_vm.bat
```

- Sur Linux/Mac : Exécutez
```bash
./launch_projet.sh
```

Attendez que la machine virtuelle soit complètement prête (cela peut prendre quelques minutes).

## Déploiement
Le script launch_projet.sh exécute automatiquement le pipeline CI/CD à l'intérieur de la VM :

Construit l'image Docker.
Lance les conteneurs pour Kakeibo API, Grafana et Prometheus.
Configure Nginx et Node Exporter.
Lance Minikube et déploie dans Kubernetes.

## Accès aux services :
- 🌟 [Kakeibo API :http://localhost:8080](http://localhost:8080)
- 📊 [Grafana :http://localhost:3000](http://localhost:3000)
- 📈 [Prometheus :http://localhost:9090](http://localhost:9090)

## Remarques
Pour arrêter la VM, utilisez la commande suivante :
```bash
vagrant halt
```

Pour supprimer la VM et libérer de l'espace, utilisez :
```bash
vagrant destroy
```
