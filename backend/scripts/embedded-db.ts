/**
 * Shared embedded-postgres configuration.
 * The instance lives under ./.pg-data and listens on port 5433 so it doesn't
 * collide with a system Postgres (which usually owns 5432).
 *
 * In production, swap DATABASE_URL to a real Postgres server and skip these
 * scripts entirely.
 */
import EmbeddedPostgres from 'embedded-postgres';
import * as path from 'path';

export const DB_PORT     = 5433;
export const DB_USER     = 'aot';
export const DB_PASSWORD = 'aot';
export const DB_NAME     = 'aot';
export const DB_DIR      = path.resolve(process.cwd(), '.pg-data');

export function buildDb(): EmbeddedPostgres {
  return new EmbeddedPostgres({
    databaseDir: DB_DIR,
    user:        DB_USER,
    password:    DB_PASSWORD,
    port:        DB_PORT,
    persistent:  true,
  });
}
