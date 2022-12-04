FROM node:14-alpine as builder

WORKDIR /home/node

COPY . /home/node
RUN apk add git --no-cache
RUN  yarn && yarn run build

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/dist/ /home/node/dist/

RUN npm install ---production
EXPOSE 3000

CMD ["node", "dist/main.js"]