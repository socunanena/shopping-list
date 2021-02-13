FROM node:15.8.0-alpine

# create destination directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy the app, note .dockerignore
COPY . /usr/src/app/
RUN yarn

# RUN ls -la

# build necessary, even if no static files are needed,
# since it builds the server as well
# RUN npm run build

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=3000

# start the app
CMD [ "yarn", "run", "dev" ]
