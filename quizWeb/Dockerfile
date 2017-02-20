FROM mhart/alpine-node
RUN mkdir -p /usr/src/web
WORKDIR /usr/src/web
COPY . .
RUN ls -ltr
RUN npm install --production
CMD ["npm", "run", "express"]