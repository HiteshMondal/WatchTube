# Use Node LTS base image
FROM node:20-bullseye

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
  watchman \
  git \
  curl \
  python3 \
  build-essential \
  openjdk-17-jdk \
  && rm -rf /var/lib/apt/lists/*

# Install expo CLI globally
RUN npm install -g expo-cli @expo/ngrok

# Copy only dependency files first for layer caching
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port used by Expo
EXPOSE 8081

# Default command
CMD ["npx", "expo", "start", "--tunnel"]
