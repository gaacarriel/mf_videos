FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY src /usr/share/nginx/html

RUN echo " \
    server { \
        listen 80; \
        server_name localhost; \
        location / { \
            add_header 'Access-Control-Allow-Origin' '*'; \
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS'; \
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range'; \
            root /usr/share/nginx/html; \
            index index.html; \
        } \
    }" > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
