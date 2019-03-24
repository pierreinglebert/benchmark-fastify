FROM node:10-alpine

# Copy source
ADD package.json /tmp/package.json
RUN npm cache clean -f
RUN cd /tmp && npm install --production

RUN mkdir -p /src && cp -a /tmp/node_modules /src/

# Bootstrap data
WORKDIR /src
ADD . /src
EXPOSE 80
CMD ["npm", "start"]
