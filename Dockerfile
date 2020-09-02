# stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# stage 2
FROM nginx:alpine
COPY --from=node /app/dist/task-angular-frontend /usr/share/nginx/html
#docker build --rm -f Dockerfile -t task-angular-frontend:v1 task-angular-frontend