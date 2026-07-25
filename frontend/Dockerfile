FROM docker.io/node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN chown -R node:node .
USER node
ARG REACT_APP_API_URL=/api
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV DISABLE_ESLINT_PLUGIN=true
RUN npm install
RUN npm run build

FROM docker.io/nginxinc/nginx-unprivileged:1.27-alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/build .
COPY nginx.conf /etc/nginx/nginx.conf.template
COPY entrypoint.sh /entrypoint.sh
USER root
RUN chown nginx:nginx /entrypoint.sh
RUN chmod +x /entrypoint.sh
USER nginx
ENTRYPOINT ["/entrypoint.sh"]