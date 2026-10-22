import { spawn } from 'node:child_process';
import { readEnvironment } from './environment.js';

const { values } = readEnvironment('development');
const children = ['dev:api', 'dev:web'].map((script) => spawn('npm', ['run', script], {
  stdio: 'inherit', env: { ...process.env, ...values, API_UPSTREAM_HOST: values.HEALTHCHECK_HOST },
}));
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill('SIGTERM');
  process.exitCode = code;
}
for (const child of children) child.on('exit', (code) => stop(code ?? 1));
process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
