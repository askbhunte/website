FROM node:12.16.3-stretch-slim
WORKDIR /usr/src/app
COPY . .
RUN yarn
CMD ["yarn","production"]