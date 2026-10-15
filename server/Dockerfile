# Author: MD Shahed
# Date: 2026-09-27
# File Name: server/Dockerfile
# Modified Last: 2026-09-27
# Description: uofs student 4th year

FROM node:20-alpine

WORKDIR /app

# Install dependencies first for efficient layer caching
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Expose server port
EXPOSE 5001

# Hot reload command using tsx watch
CMD ["npm", "run", "dev"]
