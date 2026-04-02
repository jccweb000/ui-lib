import { spawnSync } from 'node:child_process';

const registry = 'https://registry.npmjs.org/';

const result = spawnSync('npm', ['whoami', '--registry', registry], {
  encoding: 'utf8',
  stdio: ['inherit', 'pipe', 'pipe'],
});

if (result.status !== 0) {
  process.stderr.write(result.stderr || 'npm 登录校验失败。\n');
  process.stderr.write(
    `请先执行: npm login --registry=${registry} --scope=@jccnpm\n`,
  );
  process.exit(result.status ?? 1);
}

const username = result.stdout.trim();

console.log(`已登录 npm 账号: ${username}`);
