import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  // dialect: "'postgresql' | 'mysql' | 'sqlite' | 'turso'",
  driver: "pg",
  dbCredentials: {
    connectionString: env.POSTGRES_URL,
  },
  
  tablesFilter: ["lumos_*"],
} satisfies Config;

// import { type Config } from "drizzle-kit";
// import { env } from "~/env";

// const config: Config = {
//   schema: "./src/server/db/schema.ts", // Path to your schema
//   dialect: "postgresql", // Specify your database dialect
//   driver: "pg", // Specify the driver for PostgreSQL
//   dbCredentials: {
//     connectionString: env.POSTGRES_URL, // Use the environment variable for connection string
//   },
//   tablesFilter: ["lumos_*"], // Filter for tables if needed
// };

// export default config;
// import { type Config } from "drizzle-kit";
// import { env } from "~/env";

// const config: Config = {
//   schema: "./src/server/db/schema.ts", // Path to your schema
//   out: "./drizzle", // Output directory for generated files
  
//   dbCredentials: {
//     connectionString: env.POSTGRES_URL,
//      // Use the environment variable for connection string
//   },
//   tablesFilter: ["lumos_*"], // Filter for tables if needed
// };

// export default config;