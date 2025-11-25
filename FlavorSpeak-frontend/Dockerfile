# Step 1: Build the React app
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine

# Copy built app
COPY --from=build /app/build /usr/share/nginx/html

# Copy template env file
COPY public/env-template.js /usr/share/nginx/html/env-template.js

# Add custom Nginx config (for SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add a startup script that replaces env vars in JS
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
