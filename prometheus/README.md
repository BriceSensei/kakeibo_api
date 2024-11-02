# Configuration Prometheus

Ce fichier de configuration Prometheus définit les endpoints à surveiller pour collecter les métriques de l'API, de l'instance Prometheus elle-même, et du Node Exporter, centralisant les informations nécessaires pour le monitoring et l'observation de la santé de l’infrastructure.

## Configuration du Fichier Prometheus `prometheus.yml`

- **Global** :
  - `scrape_interval` : Intervalle global de collecte des métriques, configuré ici à 15 secondes.

- **scrape_configs** :
  - **job_name** : Nom du job de scrappage pour organiser et distinguer les différents endpoints surveillés.
  - **targets** : Cibles spécifiques de collecte des métriques pour chaque job.

## Jobs de Monitoring

- **API Metrics** :
  - **Nom du Job** : `api`
  - **Targets** : `15.236.190.151:8080`, `35.181.38.238:8080`
  - **Description** : Collecte les métriques de l'API depuis les endpoints `/metrics` (via `http://15.236.190.151:8080/metrics` et `http://35.181.38.238:8080/metrics`).

- **Prometheus Metrics** :
  - **Nom du Job** : `prometheus`
  - **Target** : `localhost:9090`
  - **Description** : Permet de monitorer Prometheus en collectant ses propres métriques depuis `http://localhost:9090/metrics`.

- **Node Exporter Metrics** :
  - **Nom du Job** : `node_exporter`
  - **Targets** : `15.236.190.151:9100`, `35.181.38.238:9100`
  - **Description** : Collecte les métriques du système via Node Exporter pour surveiller l'état des ressources (CPU, RAM, etc.), accessibles depuis `http://15.236.190.151:9100/metrics` et `http://35.181.38.238:9100/metrics`.

### Accéder aux Métriques

Pour accéder à l'interface de Prometheus et visualiser les cibles surveillées, ouvrez votre navigateur et accédez à : `http://15.236.190.151:9090/targets` (ou remplacez l'adresse IP par celle de ptof ou ptr_ptof).

### Exigences

- Assurez-vous que les ports utilisés (8080 pour l'API, 9090 pour Prometheus, et 9100 pour Node Exporter) sont ouverts dans vos groupes de sécurité ou pare-feu.
- Les cibles doivent être accessibles depuis l'instance où Prometheus est déployé.
