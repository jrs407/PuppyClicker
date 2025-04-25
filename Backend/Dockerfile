# Usar Node.js como imagen base
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar dependencias
RUN npm install
RUN npm install -g typescript ts-node ts-node-dev

# Copiar el código fuente
COPY . .

# Exponer el puerto 8080
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["npx", "ts-node-dev", "--respawn", "--transpile-only", "server.ts"]
