import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../../generated/prisma/client";
import { envVars } from "../config/env";


// const connectionString = `${process.env.DATABASE_URL}`;

const connectionString = envVars.DATABASE_URL;

const pool = new Pool({
  connectionString,
  max: 3,
  idleTimeoutMillis: 60000,
  connectionTimeoutMillis: 30000,
  ssl: { rejectUnauthorized: false },
  statement_timeout: 30000,
  query_timeout: 30000,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export { prisma };