# Author: MD Shahed
# Date: 2026-09-27
# File Name: client/Dockerfile
# Modified Last: 2026-09-27
# Description: uofs student 4th year

FROM node:20-alpine

WORKDIR /app

# Cache package dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Run Vite dev server with host binding for Docker
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
