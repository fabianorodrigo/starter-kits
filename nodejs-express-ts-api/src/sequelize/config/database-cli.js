module.exports = {
  development: {
    username: process.env.POSTGRES_DB_USERNAME,
    password: process.env.POSTGRES_DB_PASSWORD,
    database: process.env.POSTGRES_DB_DATABASE,
    host: process.env.POSTGRES_DB_HOSTNAME,
    port: parseInt(process.env.POSTGRES_DB_PORT || "15432"),
    dialect: "postgres",
  },
  test: {
    username: process.env.POSTGRES_DB_USERNAME,
    password: process.env.POSTGRES_DB_PASSWORD,
    database: process.env.POSTGRES_DB_DATABASE,
    host: process.env.POSTGRES_DB_HOSTNAME,
    port: parseInt(process.env.POSTGRES_DB_PORT || "15432"),
    dialect: "postgres",
  },
  production: {
    username: process.env.POSTGRES_DB_USERNAME,
    password: process.env.POSTGRES_DB_PASSWORD,
    database: process.env.POSTGRES_DB_DATABASE,
    host: process.env.POSTGRES_DB_HOSTNAME,
    port: parseInt(process.env.POSTGRES_DB_PORT || "15432"),
    dialect: "postgres",
  },
};
