# Build Stage 1

FROM node:23-slim AS build
WORKDIR /app

# Copy package.json and your lockfile, here we add pnpm-lock.yaml for illustration
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the entire project
COPY . ./
COPY .env.docker /app/.env

# Build the project
RUN npm run build

# Build Stage 2

FROM node:23-slim
WORKDIR /app

# Only `.output` folder is needed from the build stage
COPY --from=build /app/.output/ ./
COPY .env.docker /app/.env

# Change the port and host
ENV PORT=80
ENV HOST=0.0.0.0

EXPOSE 80

CMD ["node", "/app/server/index.mjs"]
