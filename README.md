
# 🧩 Kakeibo API - DevOps Project
## 📖 Présentation du projet
Le projet Kakeibo API est une API de gestion budgétaire basée sur le concept japonais de kakeibo, qui vise à aider les utilisateurs à organiser et suivre leurs dépenses. Pour garantir une infrastructure stable et performante, le déploiement a été optimisé avec les meilleures pratiques DevOps, intégrant des outils comme Docker, Kubernetes, et Terraform.

### 🛠 Technologies et outils
- **Infrastructure** : 

**AWS** pour le cloud, **Terraform** pour l'automatisation de l'infrastructure, **Ansible** pour la configuration des serveurs.**
- **Déploiement CI/CD**  : 

**Workflows GitHub Actions** pour automatiser le pipeline, **Docker** pour la conteneurisation et **Kubernetes** pour l’orchestration.
- **Surveillance** :

 **Prometheus** pour le monitoring des métriques API et serveur, **Grafana** pour la visualisation et la création d’alertes vers Discord.
- **Environnement local** :

 Solution de continuité avec **Vagrant** et **VirtualBox** pour un déploiement local en cas de panne AWS.

### 🌐 Fonctionnalités DevOps
- **Infrastructure as Code (IaC)** : 

Création de serveurs EC2 avec Terraform et configuration automatisée avec Ansible.
- **CI/CD**:

Pipeline GitHub Actions pour le build, le test et le déploiement en production.
Conteneurisation et Orchestration : Utilisation de Docker et Kubernetes pour garantir la scalabilité et la résilience.

- **Monitoring & Alerting**:

Suivi des performances API et alertes configurées pour la réactivité des incidents.

## 📂 Structure des fichiers
```bash
├── 📁 terraform/               # Configuration Terraform pour AWS
├── 📁 ansible/                 # Playbooks Ansible pour la configuration des serveurs
├── 📁 k8s/                     # Manifests Kubernetes
├── 📁 cicd/                    # Fichiers pour les pipelines CI/CD GitHub Actions
├── 📄 README.md                # README principal avec l'aperçu du projet
└── 📁 monitoring/              # Configurations pour Grafana et Prometheus
```

## 🚀 Installation et Exécution
- **Pré-requis** : Assurez-vous d’avoir les clés AWS configurées et de créer un fichier .env.
- **Lancement** : Exécutez launch_vm.bat et launch_projet.sh pour déployer l’API, Docker, et Kubernetes.
- **Surveillance** : Accédez à Grafana et Prometheus pour visualiser les métriques et les alertes.

## 🔗 Documentation Complète
Chaque section dispose de son propre README pour plus de détails :

- **API Documentation** – Détails sur l’API Kakeibo.
- **CI/CD Documentation** – Configuration et workflows CI/CD.
- **Monitoring Documentation** – Configuration de Grafana et Prometheus pour le monitoring