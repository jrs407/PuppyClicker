# Usar Node.js como imagen base
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Instalar dependencias del sistema primero
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copiar solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Limpiar cache de npm e instalar dependencias
RUN npm cache clean --force
RUN npm install
RUN npm rebuild bcrypt --build-from-source

# Instalar herramientas de desarrollo globales
RUN npm install -g typescript ts-node ts-node-dev

# Copiar el resto del código
COPY . .

# Exponer el puerto 8080
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["npx", "ts-node-dev", "--respawn", "--transpile-only", "server.ts"]
