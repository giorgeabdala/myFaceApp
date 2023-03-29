# syntax=docker/dockerfile:1.4

FROM node:lts-buster-slim AS dev

# Create app directory
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN npm ci

COPY . /usr/src/app

EXPOSE 3000

CMD [ "npm", "run", "dev" ]

FROM dev As prod
RUN apt-get update
RUN apt-get install -y --no-install-recommends git

# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "npm", "run", "start" ]