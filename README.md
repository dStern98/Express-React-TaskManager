# Description

This is a simple MERN stack implementation of a Task Manager. The backend uses Mongoose to interact with a MongoDB database.
The front-end uses React with no other frameworks.

## Run Using Docker

There is a `docker-compose.dev.yml` file for dev deployments. It uses bind mounts to propogate changes automatically
to the containers, as well as `nodemon` for automatic server restart. The dev server UI is accessed on port 5000.
To run, use the command `docker compose -f docker-compose.dev.yml up -d`. The production server builds the React bundle,
and mounts it into an Nginx container. To run the production build, use the command `docker compose -f docker-compose.prod.yml up -d`.
The production UI can be accessed on port 80. The production build uses a volume to preserve the mongoDB data across container deployments,
while the dev version does not (data is lost when the container is destroyed).

## Setting the .env file

The docker deployment expects a `.env` file to be present in the `/Backend` directory. An acceptable `.env` for the docker-compose files
currently written would look like the following:

```
MONGO_USER = "david"
MONGO_PASSWORD = "somepassword"
```
