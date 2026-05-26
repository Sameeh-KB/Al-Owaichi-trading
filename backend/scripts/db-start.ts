/**
 * Boots the embedded Postgres server, then keeps the process alive so it
 * stays running while you develop. Ctrl-C cleanly shuts it down.
 */
import * as fs from 'fs';
import { buildDb, DB_DIR, DB_NAME } from './embedded-db';

(async () => {
  const pg     = buildDb();
  const exists = fs.existsSync(DB_DIR);

  if (!exists) {
    console.log('[db] initialising data directory at', DB_DIR);
    await pg.initialise();
  }

  console.log('[db] starting embedded Postgres on port 5433...');
  await pg.start();

  if (!exists) {
    console.log('[db] creating database', DB_NAME);
    await pg.createDatabase(DB_NAME);
  }

  console.log('[db] ✅ ready — connect with: postgresql://aot:aot@localhost:5433/aot');
  console.log('[db] press Ctrl-C to stop.');

  const shutdown = async () => {
    console.log('\n[db] shutting down...');
    try { await pg.stop(); } catch {}
    process.exit(0);
  };
  process.on('SIGINT',  shutdown);
  process.on('SIGTERM', shutdown);
})();
