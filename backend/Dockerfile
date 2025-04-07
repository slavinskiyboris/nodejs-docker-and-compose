FROM node:16-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build the application
COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:16-alpine as production

WORKDIR /app

# Install pm2 globally
RUN npm install -g pm2

# Copy package files from builder
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from builder
COPY --from=builder /app/dist ./dist/

# Set up PM2 ecosystem file
COPY ecosystem.config.js ./

# Expose the port the app runs on
EXPOSE 3000

# Start the application with PM2
CMD ["pm2-runtime", "ecosystem.config.js"] 