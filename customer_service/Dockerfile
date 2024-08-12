# Utiliser une image de Node.js
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Installer nodemon globalement
RUN npm install -g nodemon

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste du code
COPY . .

# Exposer le port sur lequel le service sera disponible
EXPOSE 3002

# Utiliser nodemon pour suivre les changements
CMD ["nodemon", "--watch", "src", "--exec", "npm", "run", "start:dev"]
