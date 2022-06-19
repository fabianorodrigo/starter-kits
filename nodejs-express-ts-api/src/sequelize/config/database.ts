interface IDatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: string;
}

export const CONFIG: {[environment: string]: IDatabaseConfig} = {
  development: {
    username: process.env.POSTGRES_DB_USERNAME as string,
    password: process.env.POSTGRES_DB_PASSWORD as string,
    database: process.env.POSTGRES_DB_DATABASE as string,
    host: process.env.POSTGRES_DB_HOSTNAME as string,
    port: parseInt(process.env.POSTGRES_DB_PORT || "5432"),
    dialect: "postgres",
  },
  test: {
    username: process.env.POSTGRES_DB_USERNAME as string,
    password: process.env.POSTGRES_DB_PASSWORD as string,
    database: process.env.POSTGRES_DB_DATABASE as string,
    host: process.env.POSTGRES_DB_HOSTNAME as string,
    port: parseInt(process.env.POSTGRES_DB_PORT || "5432"),
    dialect: "postgres",
  },
  production: {
    username: process.env.POSTGRES_DB_USERNAME as string,
    password: process.env.POSTGRES_DB_PASSWORD as string,
    database: process.env.POSTGRES_DB_DATABASE as string,
    host: process.env.POSTGRES_DB_HOSTNAME as string,
    port: parseInt(process.env.POSTGRES_DB_PORT || "5432"),
    dialect: "postgres",
  },
};
