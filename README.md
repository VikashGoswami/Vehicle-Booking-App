
# Vehicle Booking App

A brief description of what this project does and who it's for


## Run Locally

Clone the project

```bash
  git clone https://github.com/VikashGoswami/Vehicle-Booking-App.git
```

Go to the project directory

```bash
  cd Vehicle-Booking-App
```

Install dependencies

```bash
  npm install
```

Initialize the Sequilize ORM for empty project:

```bash
  npx sequelize-cli init
```

Folder Create named config inside this folder edit config.json:

```bash
  "database": "vehicle", (Change name of database in development)
```

Change .env1 name to .env

```bash
  ``
```

Run the migrations to create tables in the MySQL database:

```bash
  npx sequelize-cli db:migrate
```

Run the seeders to populate the database with initial 2 dummy data:

```bash
  npx sequelize-cli db:seed:all
```

Start the server

```bash
  npm run dev
```


