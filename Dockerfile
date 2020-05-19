FROM node:10-alpine
ENV NODE_ENV "production"
ENV PORT 8080
EXPOSE 8080
RUN addgroup mygroup && adduser -D -G mygroup myuser && mkdir -p /usr/src/app && chown -R myuser /usr/src/app

# Prepare app directory
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
COPY tracer.js /usr/src/app
RUN chown myuser /usr/src/app/yarn.lock

USER myuser
RUN yarn install

COPY . /usr/src/app

# Start the app
#CMD ["/usr/local/bin/npm", "start", "--domain=.jx-staging.35.241.184.104.nip.io"] 
CMD ["/usr/local/bin/npm", "start"]
