# ⚙️ Playbooks Ansible

# ⚙️ Déploiement et Configuration Automatisée avec Ansible pour CI/CD et Monitoring

Ce dossier Ansible regroupe plusieurs playbooks permettant d’installer et configurer les logiciels essentiels pour l’infrastructure de déploiement et de monitoring de l’application, y compris Docker, Kubernetes, Node Exporter et un runner GitHub Actions. Ansible permet de gérer automatiquement ces installations et configurations de manière reproductible.

## 📝 install_cerbot_and_nginx.yml
Déploiement de Nginx avec SSL Let's Encrypt.

- **Nom** : Déployer SSL Let's Encrypt avec Nginx.
- **Hôte** : `localhost` – Exécute les tâches localement.
- **Tâches** :
  - 📦 **Mise à jour des paquets**.
  - 🌐 **Installation et démarrage de Nginx**.
  - 🔒 **Installation de Certbot** pour la génération de certificats SSL.
  - 📂 **Création d'un répertoire** pour le challenge HTTP de Certbot.
  - 🛠️ **Obtention des certificats SSL** avec Certbot.
  - 📄 **Déploiement de la configuration Nginx** depuis un template.
  - ⏰ **Création d'un cron job** pour le renouvellement automatique des certificats.
- **Handler** : Redémarre Nginx si la configuration est modifiée.

---

## 🐋 install_docker.yml
Installe Docker et configure le service.

- **Nom** : Installation de Docker.
- **Hôte** : `localhost` – Exécute les tâches localement.
- **Tâches** :
  - 🔄 **Mise à jour du cache APT**.
  - 🌐 **Installation des dépendances** pour les dépôts HTTPS.
  - 🔑 **Ajout de la clé GPG officielle de Docker**.
  - 🗂️ **Ajout du dépôt Docker** pour les installations apt.
  - 📦 **Installation de Docker** (ignore les erreurs).
  - 📜 **Vérification de l'installation** en affichant la version Docker.
  - 🛠️ **Redémarrage du service Docker** si nécessaire.
  - 🔍 **Affichage du statut de Docker** pour confirmer son fonctionnement.

---

## ☸️ install_kubernetes.yml
Installe Minikube et kubectl pour Kubernetes.

- **Nom** : Installation de Minikube et kubectl.
- **Hôtes** : `kubectl_nodes` – Exécute les tâches sur les nœuds avec kubectl.
- **Tâches** :
  - 📦 **Installation des dépendances** (curl, apt-transport-https, etc.).
  - 📥 **Téléchargement de la version la plus récente de kubectl**.
  - 🛠️ **Installation de kubectl** et configuration des permissions d'exécution.
  - 📥 **Installation de Minikube** et définition des permissions d'exécution.
  - 🔍 **Vérification de l'installation de kubectl**.
  - 🔍 **Vérification de l'installation de Minikube**.
  - 🚀 **Démarrage de Minikube** avec le driver Docker.

---

## 📊 install_node_exporter.yml
Installation et configuration de Node Exporter pour la collecte de métriques.

- **Nom** : Installation de Node Exporter.
- **Hôtes** : `all` – Exécute les tâches sur tous les nœuds.
- **Tâches** :
  - 📥 **Téléchargement de Node Exporter** depuis le dépôt officiel.
  - 📂 **Extraction de Node Exporter** et déploiement sur le système.
  - 📝 **Création d'un service systemd** pour Node Exporter.
  - 🚀 **Activation et démarrage du service Node Exporter**.

---

## 🤖 setup_runner.yml
Configuration du runner GitHub Actions.

- **Nom** : Configuration du runner GitHub Actions.
- **Hôtes** : `localhost` – Exécute les tâches localement.
- **Variables** :
  - `github_runner_token` : Jeton d'authentification pour le runner GitHub.
- **Tâches** :
  - 📂 **Création du répertoire du runner**.
  - 📥 **Téléchargement du runner GitHub Actions**.
  - 🔍 **Validation de l'intégrité du fichier** avec un hash.
  - 📂 **Extraction du runner** dans le répertoire de travail.
  - 🔧 **Configuration du runner** avec `config.sh` pour l'associer au repository GitHub.
  - ▶️ **Démarrage du runner** avec `run.sh`.
