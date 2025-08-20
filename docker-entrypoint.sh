#!/bin/sh
set -e

: "${DB_HOST:=db}"
: "${DB_PORT:=5432}"
: "${DB_NAME:=tsn_assessment_dev}"
: "${DB_USER:=postgres}"
: "${DB_PASS:=postgres}"

CONFIG_PATH="./config/config.json"

if [ -f "$CONFIG_PATH" ]; then
  echo "Configuring $CONFIG_PATH for Docker runtime..."
  # host
  sed -i "s/\"host\": *\"[^\"]*\"/\"host\": \"${DB_HOST}\"/g" "$CONFIG_PATH"
  # username
  sed -i "s/\"username\": *\"[^\"]*\"/\"username\": \"${DB_USER}\"/g" "$CONFIG_PATH"
  # password (allow null -> string in docker)
  sed -i "s/\"password\": *null/\"password\": \"${DB_PASS}\"/g" "$CONFIG_PATH"
  sed -i "s/\"password\": *\"[^\"]*\"/\"password\": \"${DB_PASS}\"/g" "$CONFIG_PATH"
  # database
  sed -i "s/\"database\": *\"[^\"]*\"/\"database\": \"${DB_NAME}\"/g" "$CONFIG_PATH"
  # dialect
  sed -i "s/\"dialect\": *\"[^\"]*\"/\"dialect\": \"postgres\"/g" "$CONFIG_PATH"
fi

echo "Waiting for database ${DB_HOST}:${DB_PORT}..."
until nc -z "$DB_HOST" "$DB_PORT"; do
  echo "Database is unavailable - sleeping"
  sleep 2
done

echo "Database is up! Running migrations and seeds..."
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all || true

echo "Starting app..."
exec node app.js
