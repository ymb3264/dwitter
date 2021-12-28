FROM node:14.16.1
WORKDIR /dwitter
COPY ./client/package*.json ./
COPY ./server/package*.json ./

RUN cd client
RUN npm install --no-optional
COPY . ./
CMD ["npm", "start"]

RUN cd ../server
RUN npm install --no-optional
CMD ["npm", "start"]