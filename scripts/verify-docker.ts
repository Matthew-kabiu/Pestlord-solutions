import { cpSync, mkdtempSync, readdirSync, rmSync, symlinkSync } from 'node:fs';
import { resolve, relative, sep } from 'node:path';
import { spawnSync } from 'node:child_process';
import { readEnvironment } from './environment.js';

const root = process.cwd();
// Stay under the shared project path: Docker Desktop may not share system /tmp.
const directory = mkdtempSync(resolve(root, '.verification-'));
const excluded = new Set(['node_modules', '.git', 'dist', 'build', 'coverage', 'backups']);
try {
  for (const entry of readdirSync(root)) {
    if (excluded.has(entry) || entry.startsWith('.env') || entry.startsWith('.verification-')) continue;
    cpSync(resolve(root, entry), resolve(directory, entry), { recursive: true, filter: (source) => {
      const parts = relative(root, source).split(sep);
      return !parts.some((part) => excluded.has(part) || part.startsWith('.env'));
    } });
  }
  symlinkSync(resolve(root, 'node_modules'), resolve(directory, 'node_modules'), 'dir');
  const tsx = resolve(root, 'node_modules/.bin/tsx');
  function run(command: string, args: string[]) {
    const result = spawnSync(command, args, { cwd: directory, stdio: 'inherit' });
    if (result.status !== 0) throw new Error(`Verification failed: ${command} (${result.signal ?? result.status})`);
  }
  run(tsx, ['scripts/ci-env.ts']);
  for (const mode of ['development', 'production']) {
    run(tsx, ['scripts/validate-env.ts', mode]);
    run(tsx, ['scripts/compose.ts', mode, 'config', '--quiet']);
  }
  process.chdir(directory);
  const { config } = readEnvironment('production');
  run('docker', ['build', '--platform', 'linux/amd64', '--target', 'production', '-t', `${config.APP_IMAGE}:${config.PESTLORD_VERSION}`, '.']);
  await import('./smoke.js');
} finally {
  for (const mode of ['development', 'production']) {
    const file = mode === 'development' ? 'docker-compose.dev.yml' : 'docker-compose.yml';
    spawnSync('docker', ['compose', '-p', `pestlord-smoke-${process.pid}-${mode}`, '--env-file', `.env.${mode}`, '-f', file, 'down', '--remove-orphans'], { cwd: directory, stdio: 'inherit' });
  }
  process.chdir(root);
  rmSync(directory, { recursive: true, force: true });
}
