import { buildDb } from './embedded-db';

(async () => {
  const pg = buildDb();
  try {
    await pg.stop();
    console.log('[db] stopped');
  } catch (e) {
    console.log('[db] not running (ok)');
  }
})();
