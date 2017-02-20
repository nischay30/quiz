FROM mhart/alpine-node
RUN mkdir -p /usr/src/controller
WORKDIR /usr/src/controller
COPY . .
RUN ls -ltr
RUN npm install
CMD ["npm", "start"]

