import { spawnSync } from 'node:child_process';
import { mkdir, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(scriptDir, '../..');
const packagesRoot = path.resolve(workspaceRoot, 'packages');
const npmCacheDir = path.resolve(workspaceRoot, '.tmp/npm-cache');

function runCommand(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    env: {
      ...process.env,
      NX_CACHE_PROJECT_GRAPH: 'false',
      NX_DAEMON: 'false',
      NX_DISABLE_DB: 'true',
      NX_ISOLATE_PLUGINS: 'false',
      npm_config_cache: npmCacheDir,
    },
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

async function getPublishablePackages() {
  const entries = await readdir(packagesRoot, { withFileTypes: true });
  const packageList = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const packageDir = path.resolve(packagesRoot, entry.name);
    const packageJsonPath = path.resolve(packageDir, 'package.json');
    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));

    if (packageJson.private) {
      continue;
    }

    packageList.push({
      cwd: packageDir,
      name: packageJson.name,
    });
  }

  return packageList;
}

async function main() {
  await mkdir(npmCacheDir, { recursive: true });

  const packageList = await getPublishablePackages();

  if (packageList.length === 0) {
    console.log('> 未找到可发布包');
    return;
  }

  for (const packageInfo of packageList) {
    console.log(`\n> npm pack --dry-run ${packageInfo.name}`);
    runCommand('npm', ['pack', '--dry-run'], packageInfo.cwd);
  }

  console.log(`\n> 已完成 ${packageList.length} 个包的 dry-run 校验`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
