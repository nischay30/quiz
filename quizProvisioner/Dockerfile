FROM mhart/alpine-node
RUN mkdir -p /usr/src/provisioner
WORKDIR /usr/src/provisioner
COPY . .
RUN ls -ltr
RUN npm install
CMD ["npm", "start"]
