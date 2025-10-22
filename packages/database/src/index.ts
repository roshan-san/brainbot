import * as schema from "@/schema"
import { EnhancedQueryLogger } from 'drizzle-query-logger'
import 'dotenv/config';
import { drizzle as nodeDrizzle} from "drizzle-orm/node-postgres";
import { drizzle as neonDrizzle } from 'drizzle-orm/neon-http';

export { schema }

const isProduction = process.env.NODE_ENV === 'production';
export const db = isProduction
  ? neonDrizzle(process.env.DATABASE_URL!, {
      schema,
      logger: new EnhancedQueryLogger(),
    })
  : nodeDrizzle({
      connection: {
        connectionString: process.env.DATABASE_URL!,
        ssl: false,
      },
      schema,
      logger: new EnhancedQueryLogger(),
    });