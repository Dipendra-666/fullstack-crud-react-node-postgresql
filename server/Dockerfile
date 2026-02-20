FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY . .

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser


EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
  CMD curl -f http://localhost:5000/ || exit 1

CMD ["npm", "start"]