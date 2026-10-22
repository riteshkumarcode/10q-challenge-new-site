const fs = require('fs');
const path = require('path');

function syncDirectory(src, dest) {
  if (!fs.existsSync(src)) {
    return false;
  }
  try {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.cpSync(src, dest, { recursive: true, force: true });
    return true;
  } catch (err) {
    console.error(`[sync-build] Error copying ${src} to ${dest}:`, err.message);
    return false;
  }
}

let rootDir = process.cwd();
if (fs.existsSync(path.join(rootDir, 'frontend', 'app')) || fs.existsSync(path.join(rootDir, 'frontend', 'package.json'))) {
  // Already in root
} else if (path.basename(rootDir) === 'frontend' && fs.existsSync(path.join(rootDir, '..', 'package.json'))) {
  // Inside frontend subdirectory
  rootDir = path.resolve(rootDir, '..');
} else if (fs.existsSync(path.resolve(__dirname, '..', 'frontend'))) {
  rootDir = path.resolve(__dirname, '..');
}

const frontendNext = path.join(rootDir, 'frontend', '.next');
const rootNext = path.join(rootDir, '.next');
const frontendPublic = path.join(rootDir, 'frontend', 'public');
const rootPublic = path.join(rootDir, 'public');

console.log(`[sync-build] Synchronizing Next.js output directory...`);
console.log(`[sync-build] Source: ${frontendNext}`);
console.log(`[sync-build] Destination: ${rootNext}`);

if (fs.existsSync(frontendNext)) {
  const copied = syncDirectory(frontendNext, rootNext);
  if (copied) {
    console.log(`[sync-build] ✓ Successfully mirrored frontend/.next -> .next (repository root)`);
  }
}

if (fs.existsSync(frontendPublic)) {
  syncDirectory(frontendPublic, rootPublic);
  console.log(`[sync-build] ✓ Successfully mirrored frontend/public -> public (repository root)`);
}

const rootValid = fs.existsSync(rootNext) && (fs.existsSync(path.join(rootNext, 'BUILD_ID')) || fs.existsSync(path.join(rootNext, 'server')));
console.log(`[sync-build] Root .next valid: ${rootValid}`);
