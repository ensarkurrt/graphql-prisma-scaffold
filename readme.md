POSTGRESQL on Docker

`docker run --name docker_postgres -e POSTGRES_PASSWORD=123456 -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres`

create .env file for yourself

run `npm install`

run `npm run generate`

run `npm run prisma:push`

for start api `npm run dev`
