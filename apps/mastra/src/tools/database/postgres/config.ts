export const postgresConfig = {
  connectionString: process.env.DATABASE_URL,
  table: process.env.POSTGRES_TABLE ?? "candidates",
};
