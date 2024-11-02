## ☸️ Configuration Kubernetes

### 📄 deployment.yml
Ce fichier définit le déploiement de l'application **Kakeibo API** sur Kubernetes. Il spécifie le nombre de réplicas, l'image Docker, les ressources allouées et les variables d'environnement.

- **apiVersion** : `apps/v1` – Version de l'API Kubernetes pour les déploiements d'applications.
- **kind** : `Deployment` – Type de ressource définissant un déploiement.
- **metadata** : Contient le nom du déploiement (`kakeibo-api`).

- **spec** :
  - **replicas** : `2` – Nombre de réplicas pour assurer la haute disponibilité.
  - **selector** : Définit les labels pour identifier les pods correspondant.
  - **template** : Modèle pour configurer les pods.
    - **metadata** : Labels associés au pod (`app: kakeibo-api`).
    - **spec** :
      - **containers** :
        - **name** : `kakeibo-api` – Nom du conteneur.
        - **image** : `bricesensei/kakeibo_api:latest` – Image Docker utilisée pour le déploiement.
        - **ports** : Port `8080` exposé par le conteneur.
        - **resources** : Définit les ressources demandées et les limites pour le conteneur.
          - **requests** : Mémoire `256Mi`, CPU `500m`.
          - **limits** : Mémoire `512Mi`, CPU `1`.
      - **env** : Définition des variables d'environnement.
        - **NODE_ENV** : `production` – Environnement de déploiement.

---

### 📄 service.yml
Ce fichier crée un service LoadBalancer pour exposer l'API Kakeibo à l'extérieur du cluster Kubernetes.

- **apiVersion** : `v1` – Version de l'API Kubernetes pour les services.
- **kind** : `Service` – Type de ressource permettant d'exposer le déploiement.
- **metadata** : Nom du service (`kakeibo-api-service`).
- **spec** :
  - **type** : `LoadBalancer` – Type de service pour exposer le service à l'extérieur.
  - **selector** : Associe le service aux pods ayant le label `app: kakeibo-api`.
  - **ports** :
    - **protocol** : `TCP`.
    - **port** : `8080` – Port exposé pour accéder à l'API.
    - **targetPort** : `8080` – Port cible correspondant à celui défini dans le conteneur.
