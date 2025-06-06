# Build stage
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production
RUN echo "Build output contents:"
RUN ls -la dist/frontend

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist/frontend/browser/* /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN echo "Nginx html directory contents:"
RUN ls -la /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
