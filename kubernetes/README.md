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

## 🛠️ Dépannage

Cette section fournit des solutions aux erreurs courantes lors du déploiement de l'API Kakeibo sur Kubernetes.

- **Erreur lors du déploiement**  
  Utilisez la commande suivante pour obtenir des détails :

  ```bash
  kubectl describe pod <nom_du_pod>
  ```

ou consultez les logs de l’application pour identifier l’erreur :

```bash
kubectl logs <nom_du_pod>
 ```

 **Pod en statut CrashLoopBackOff**
Ce statut indique souvent une erreur de configuration. Pour identifier la cause, affichez les logs du pod :


```bash
kubectl logs <nom_du_pod>
 ```

Assurez-vous que toutes les variables d’environnement sont bien définies et que les ressources allouées sont suffisantes.

Problème de connectivité réseau
Si le service n'est pas accessible, vérifiez le statut du service :

```bash
kubectl get services
```

Assurez-vous également que le type de service est correctement configuré (par exemple, LoadBalancer ou NodePort selon le besoin).

Ressources insuffisantes
Si les ressources sont épuisées, ajustez les valeurs des requests et limits pour le CPU et la mémoire dans le fichier deployment.yml. Cela peut être nécessaire si les ressources allouées sont insuffisantes pour exécuter l’application de manière stable.