FROM node:22

LABEL maintainer="Lavrekha Lyudmyla"
LABEL version="1.0.0"
LABEL description="Control Node.js Application"


WORKDIR /app

COPY ./backend/package*.json ./

RUN npm install --ignore-scripts --legacy-peer-deps

COPY ./backend ./

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]

