FROM node:14.16.1
WORKDIR /dwitter/server
COPY package*.json ./
RUN npm install --no-optional
COPY . ./
CMD ["npm", "start"]
