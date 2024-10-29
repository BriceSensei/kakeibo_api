#!/bin/bash

# Démarre la VM Vagrant
vagrant up

# Attendre que la VM soit complètement démarrée
echo "Attente de la machine virtuelle pour être prête..."
sleep 30  # Ajuste le temps d'attente si nécessaire

# Accéder à la VM et exécuter le pipeline CI/CD
echo "Lancement du pipeline CI/CD..."

# Exécute les étapes du pipeline CI/CD
vagrant ssh -c "
  cd /vagrant
  
  # Construire l'image Docker
  docker build -t bricesensei/kakeibo_api:latest .

  # Vérifier les images Docker
  docker images

  # Lancer le conteneur Docker
  if [ \$(docker ps -a -q -f name=kakeibo_api) ]; then
    docker rm -f kakeibo_api
  fi
  docker run -d -p 8080:8080 --name kakeibo_api bricesensei/kakeibo_api:latest

  # Lancer Grafana
  if [ \$(docker ps -a -q -f name=grafana) ]; then
    docker rm -f grafana
  fi
  docker run -d -p 3000:3000 --name grafana \
    -v grafana-storage:/var/lib/grafana \
    grafana/grafana:latest

  # Préparer le répertoire de configuration de Prometheus
  mkdir -p ~/prometheus_config

  # Exécuter Prometheus
  if [ \$(docker ps -a -q -f name=prometheus) ]; then
    docker rm -f prometheus
  fi
  docker run -d -p 9090:9090 --name prometheus \
    -v ~/prometheus_config/prometheus.yml:/etc/prometheus/prometheus.yml \
    prom/prometheus:latest

  # Autres configurations pour Nginx, Node Exporter, etc.
  sudo systemctl enable nginx
  sudo systemctl restart nginx
  sudo systemctl start node_exporter

  # Lancer Minikube
  minikube start

  # Vérifier le statut de Minikube et déployer dans Kubernetes
  kubectl get all
  kubectl apply -f kubernetes/ --validate=false
"

echo "Pipeline CI/CD terminé."