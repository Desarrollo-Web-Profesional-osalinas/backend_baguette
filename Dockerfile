# Etapa de construcción (Build)
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias limpiamente
RUN npm ci

# Copiar el código fuente
COPY . .

# Eliminar dependencias de desarrollo y cache para reducir tamaño
RUN npm prune --production

# Etapa final (Production)
FROM node:20-alpine AS runner

WORKDIR /app

# Configurar entorno de producción
ENV NODE_ENV=production

# Copias dependencias de producción y código fuente desde builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env ./.env

# Crear un usuario no root para mayor seguridad
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
USER nodejs

# Exponer el puerto de la aplicación (solo internamente en Docker)
EXPOSE 3000

# Añadir PORT 3000 para forzar el server interno en caso de .env default
ENV PORT=3000

CMD ["npm", "start"]
