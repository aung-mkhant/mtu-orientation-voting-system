# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# This Dockerfile uses Docker Hardened Images (DHI) for enhanced security.
# For more information, see https://docs.docker.com/dhi/

ARG NODE_VERSION=24

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

FROM base as dev

COPY package*.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm install

COPY . .

ENV NODE_ENV=development

USER node

CMD ["npm", "run","dev"]


# Deps stage: install production dependencies only.
FROM base AS deps

COPY package*.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Runner stage: minimal runtime image with compiled app and production deps.
FROM base AS runner

ENV NODE_ENV=production

COPY --from=deps --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

USER node

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD ["node", "server.js"]