#!/bin/bash

# Install Certbot and Nginx plugin if not already installed
apt-get update
apt-get install -y certbot python3-certbot-nginx

# Obtain SSL certificate for frontend
certbot --nginx -d slavinskiy2.nomorepartiessbs.ru --non-interactive --agree-tos --email admin@slavinskiy2.nomorepartiessbs.ru

# Obtain SSL certificate for backend
certbot --nginx -d api.slavinskiy2.nomorepartiessbs.ru --non-interactive --agree-tos --email admin@slavinskiy2.nomorepartiessbs.ru

# Set up auto-renewal with cron
echo "0 0,12 * * * certbot renew --quiet" | sudo tee -a /etc/crontab > /dev/null

# Copy nginx configuration files
cp nginx/frontend.conf /etc/nginx/sites-available/frontend
cp nginx/backend.conf /etc/nginx/sites-available/backend

# Create symlinks to enable configs
ln -sf /etc/nginx/sites-available/frontend /etc/nginx/sites-enabled/
ln -sf /etc/nginx/sites-available/backend /etc/nginx/sites-enabled/

# Restart Nginx
systemctl restart nginx 