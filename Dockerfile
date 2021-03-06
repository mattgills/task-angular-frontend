# stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# stage 2
FROM nginx:alpine
COPY --from=node /app/dist/task-angular-frontend /usr/share/nginx/html

# TO BUILD THIS CONTAINER USE THE COMMAND
# docker build --rm -f Dockerfile -t task-angular-frontend:v1 .

# TO RUN THIS CONTAINER USE THE COMMAND
# docker run --rm -d -p 80:80 task-angular-frontend:v1

# ALTERNATIVELY THE DOCKER COMPOSE FILE CAN BE USED
# docker-compose up -d