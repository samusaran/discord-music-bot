FROM node:lts
WORKDIR discord-music-bot

COPY . .
RUN node -v
RUN npm install

CMD npm start
