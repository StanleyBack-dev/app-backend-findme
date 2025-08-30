# Etapa de build
FROM node:18-alpine AS builder
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Compila o TypeScript
RUN npm run build

# Etapa de produção
FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --production

# Copia build do Nest
COPY --from=builder /app/dist ./dist

# Expõe porta GraphQL
EXPOSE 3000

# Comando para rodar o app
CMD ["node", "dist/main.js"]