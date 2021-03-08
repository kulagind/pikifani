# compile angular frontend
FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# serve app with nginx server
FROM nginx:latest
COPY --from=build /app/dist/pf /usr/share/nginx/html
COPY --from=build /app/scripts/nginx/nginx.conf /etc/nginx/
COPY --from=build /app/scripts/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
