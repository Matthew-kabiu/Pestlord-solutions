import { readEnvironment } from './environment.js';

try {
  const { file } = readEnvironment(process.argv[2] ?? 'development');
  console.log(`${file}: valid`);
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Environment validation failed');
  process.exitCode = 1;
}
