# 🧱 Stage 1: Base build using slim image
FROM node:20-slim AS base

# Set working directory
WORKDIR /app

# Install essential deps only (no JDK, no watchman unless needed)
RUN apt-get update && apt-get install -y \
  git \
  curl \
  python3 \
  build-essential \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install expo CLI + ngrok globally
RUN npm install -g expo-cli @expo/ngrok

# Copy only package.json and lock for dependency layer
COPY package*.json ./
RUN npm ci

# Copy rest of the app
COPY . .

# Optional: Remove unused dev deps
RUN npm prune --omit=dev

# Expose required ports (Expo + Metro)
EXPOSE 8081 19000 19001 19002

# Start Expo in tunnel mode
CMD ["npx", "expo", "start", "--tunnel"]
