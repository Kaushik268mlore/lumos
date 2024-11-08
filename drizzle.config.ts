// import { type Config } from "drizzle-kit";

// import { env } from "~/env";

// export default {
//   schema: "./src/server/db/schema.ts",
//   // dialect: "'postgresql' | 'mysql' | 'sqlite' | 'turso'",
//   driver: "pg",
//   dbCredentials: {
//     connectionString: env.POSTGRES_URL,
//   },
  
//   tablesFilter: ["lumos_*"],
// } satisfies Config;
import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: env.POSTGRES_URL,
  },
  tablesFilter: ["t3gallery_*"],
} satisfies Config;
