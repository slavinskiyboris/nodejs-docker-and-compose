# Stage 1: Build the frontend
FROM node:16-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build the frontend
COPY . .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:latest

# Copy the build output to nginx's html directory
COPY --from=builder /app/build /usr/share/nginx/html

# Copy the nginx configuration file
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 