#!/bin/bash

# Parcours de chaque sous-dossier
for dir in */; do
  # Vérification que c'est bien un répertoire
  if [ -d "$dir" ]; then
    echo "Installation dans le répertoire : $dir"
    
    # Se déplacer dans le répertoire
    cd "$dir"
    
    # Exécuter npm install
    npm install
    
    echo "Installation terminée dans le répertoire : $dir"
    
    # Revenir au répertoire parent
    cd ..
  fi
done
