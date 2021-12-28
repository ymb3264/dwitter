FROM node:14.16.1
WORKDIR /dwitter/client
COPY package*.json ./
RUN npm update --force
RUN npm install --no-optional
COPY . ./
CMD ["npm", "start"]