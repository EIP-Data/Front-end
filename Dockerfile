# Étape 1 : Construction du projet
FROM node:18-alpine AS build

# Crée un dossier de travail
WORKDIR /app

# Copie les fichiers de configuration et installe les dépendances
COPY package*.json ./
RUN npm ci

# Copie le reste du code source
COPY . .

# Compile le projet pour la production
RUN npm run build

# Étape 2 : Serveur Nginx pour la prod
FROM nginx:stable-alpine

# Supprime la configuration par défaut
RUN rm -rf /usr/share/nginx/html/*

# Copie les fichiers buildés depuis la première étape
COPY --from=build /app/dist /usr/share/nginx/html

# Copie une configuration nginx personnalisée (optionnelle)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]