#!/bin/sh

echo "Before substitution:"
cat /usr/share/nginx/html/env-template.js

envsubst < /usr/share/nginx/html/env-template.js > /usr/share/nginx/html/env-template.tmp && mv /usr/share/nginx/html/env-template.tmp /usr/share/nginx/html/env-template.js

echo "After substitution:"
cat /usr/share/nginx/html/env-template.js

echo $BACKEND_REST_URL
# Start Nginx
exec "$@"
