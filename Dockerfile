FROM nginx:1.19.10-alpine
COPY /dist/myFirstApp /usr/share/nginx/html

# Expose port 80
EXPOSE 80
