import { spawnSync } from 'node:child_process';
import { readEnvironment } from './environment.js';

try {
  const mode = process.argv[2];
  const { file } = readEnvironment(mode);
  const composeFile = mode === 'development' ? 'docker-compose.dev.yml' : 'docker-compose.yml';
  const result = spawnSync('docker', ['compose', '--env-file', file, '-f', composeFile, ...process.argv.slice(3)], { stdio: 'inherit' });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Compose failed');
  process.exitCode = 1;
}
