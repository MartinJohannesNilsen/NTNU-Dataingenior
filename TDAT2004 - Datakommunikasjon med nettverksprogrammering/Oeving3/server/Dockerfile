# base image
FROM node:10

# set working directory
WORKDIR ./

# install and cache app dependencies
COPY package*.json ./
RUN npm install
RUN npm i compile-run

# Bundle app source
COPY . .

#Expose port 8080
EXPOSE 8080

# start app
CMD ["node", "server.js"]