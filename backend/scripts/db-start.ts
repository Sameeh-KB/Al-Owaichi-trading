/**
 * Boots the embedded Postgres server with UTF-8 encoding.
 *
 * Uses the correct platform binary (Linux / macOS / Windows) automatically.
 * Port 5434 avoids collisions with system Postgres (5432) and other services.
 */
import * as fs   from 'fs';
import * as os   from 'os';
import * as path from 'path';
import { execFileSync } from 'child_process';
import { buildDb, DB_DIR, DB_NAME, DB_USER, DB_PASSWORD, DB_PORT } from './embedded-db';

// ── Resolve the correct pg_ctl binary for this OS ─────────────
function getPgCtl(): string {
  const platform = os.platform();
  const arch     = os.arch();

  const pkgMap: Record<string, string> = {
    'linux-x64':   '@embedded-postgres/linux-x64',
    'linux-arm64': '@embedded-postgres/linux-arm64',
    'darwin-x64':  '@embedded-postgres/darwin-x64',
    'darwin-arm64':'@embedded-postgres/darwin-arm64',
    'win32-x64':   '@embedded-postgres/windows-x64',
  };

  const key = `${platform}-${arch}`;
  const pkg  = pkgMap[key];
  if (!pkg) throw new Error(`Unsupported platform: ${key}`);

  const binDir  = path.resolve(__dirname, `../node_modules/${pkg}/native/bin`);
  const exe     = platform === 'win32' ? 'pg_ctl.exe' : 'pg_ctl';
  return path.join(binDir, exe);
}

(async () => {
  const pg = buildDb();

  if (!fs.existsSync(DB_DIR) || fs.readdirSync(DB_DIR).length === 0) {
    // ── Manually run initdb with UTF-8 encoding ──────────────
    console.log('[db] initialising data directory at', DB_DIR);
    fs.mkdirSync(DB_DIR, { recursive: true });

    const pgCtl  = getPgCtl();
    const pwFile = path.join(os.tmpdir(), `pg_pw_${Date.now()}.txt`);
    fs.writeFileSync(pwFile, DB_PASSWORD, { encoding: 'utf8' });

    try {
      execFileSync(pgCtl, [
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
  }

  // ── Start the server ─────────────────────────────────────
  console.log('[db] starting embedded Postgres on port', DB_PORT);
  await pg.start();

  // ── Create the application database (first run only) ─────
  try {
    await pg.createDatabase(DB_NAME);
    console.log('[db] created database', DB_NAME);
  } catch {
    // already exists on subsequent runs — that's fine
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
