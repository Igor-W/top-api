FROM node:14-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install
ADD . .
RUN npm run build
RUN npm prune --production
CMD [ "node", "./dist/main.js" ]
# ADD . .
# RUN npm install
# RUN npm run build
# CMD [ "node", "./dist/main.js" ]
