/**
 * Boots the embedded Postgres server with UTF-8 encoding.
 *
 * When the data directory does not exist, we call pg_ctl initdb directly
 * with --encoding=UTF8 --locale=C so that Arabic / multilingual text works.
 * (The embedded-postgres wrapper doesn't expose these initdb flags, so we
 *  bypass it for initialisation only.)
 *
 * Port 5434 avoids collisions with system Postgres (5432) and other services.
 */
import * as fs   from 'fs';
import * as os   from 'os';
import * as path from 'path';
import { execFileSync } from 'child_process';
import { buildDb, DB_DIR, DB_NAME, DB_USER, DB_PASSWORD, DB_PORT } from './embedded-db';

const PG_BIN = path.resolve(
  __dirname,
  '../node_modules/@embedded-postgres/windows-x64/native/bin',
);
const PG_CTL = path.join(PG_BIN, 'pg_ctl.exe');

(async () => {
  const pg = buildDb();

  if (!fs.existsSync(DB_DIR) || fs.readdirSync(DB_DIR).length === 0) {
    // ── Manually run initdb with UTF-8 encoding ──────────────
    console.log('[db] initialising data directory at', DB_DIR);
    fs.mkdirSync(DB_DIR, { recursive: true });

    // Write password to a temp file (initdb requires --pwfile)
    const pwFile = path.join(os.tmpdir(), `pg_pw_${Date.now()}.txt`);
    fs.writeFileSync(pwFile, DB_PASSWORD, { encoding: 'utf8' });

    try {
      execFileSync(PG_CTL, [
        'initdb',
        '-D', DB_DIR,
        '-o', [
          `--username=${DB_USER}`,
          `--pwfile=${pwFile}`,
          '--encoding=UTF8',
          '--locale=C',
          '--auth=md5',
          '--auth-host=md5',
        ].join(' '),
      ], { stdio: 'pipe' });
      console.log('[db] initdb complete — encoding: UTF8, locale: C');
    } finally {
      fs.unlinkSync(pwFile);
    }

    // ── Start the server ─────────────────────────────────────
    console.log('[db] starting embedded Postgres on port', DB_PORT);
    await pg.start();

    // ── Create the application database ──────────────────────
    console.log('[db] creating database', DB_NAME);
    await pg.createDatabase(DB_NAME);

  } else {
    // Data directory already exists — just start the server
    console.log('[db] starting embedded Postgres on port', DB_PORT);
    await pg.start();
  }

  console.log(`[db] ✅ ready — connect with: postgresql://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}`);
  console.log('[db] press Ctrl-C to stop.');

  const shutdown = async () => {
    console.log('\n[db] shutting down...');
    try { await pg.stop(); } catch {}
    process.exit(0);
  };
  process.on('SIGINT',  shutdown);
  process.on('SIGTERM', shutdown);
})();
