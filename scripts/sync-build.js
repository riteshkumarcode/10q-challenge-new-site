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

// Determine root directory regardless of current working directory
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

// 1. Mirror frontend/.next to root .next
if (fs.existsSync(frontendNext)) {
  const copied = syncDirectory(frontendNext, rootNext);
  if (copied) {
    console.log(`[sync-build] ✓ Successfully mirrored frontend/.next -> .next (repository root)`);
  }
} else {
  console.warn(`[sync-build] Warning: Source ${frontendNext} does not exist yet.`);
}

// 2. Mirror public folder to root
if (fs.existsSync(frontendPublic)) {
  syncDirectory(frontendPublic, rootPublic);
  console.log(`[sync-build] ✓ Successfully mirrored frontend/public -> public (repository root)`);
}

// 3. Process standalone output for platforms like Hostinger
const staticSrc = fs.existsSync(path.join(rootNext, 'static')) 
  ? path.join(rootNext, 'static') 
  : path.join(frontendNext, 'static');

const publicSrc = fs.existsSync(rootPublic) ? rootPublic : frontendPublic;

// Setup standalone targets
const standaloneLocations = [
  path.join(rootNext, 'standalone'),
  path.join(frontendNext, 'standalone'),
  path.join(rootDir, 'standalone'), // also expose at root/standalone if platform checks there
];

standaloneLocations.forEach((stDir) => {
  if (fs.existsSync(stDir)) {
    // Copy static files into standalone/.next/static and standalone/frontend/.next/static
    if (fs.existsSync(staticSrc)) {
      syncDirectory(staticSrc, path.join(stDir, '.next', 'static'));
      syncDirectory(staticSrc, path.join(stDir, 'frontend', '.next', 'static'));
    }
    // Copy public files into standalone/public and standalone/frontend/public
    if (fs.existsSync(publicSrc)) {
      syncDirectory(publicSrc, path.join(stDir, 'public'));
      syncDirectory(publicSrc, path.join(stDir, 'frontend', 'public'));
    }
    // Ensure a top-level server.js exists in standalone directory
    const directServer = path.join(stDir, 'server.js');
    const nestedServer = path.join(stDir, 'frontend', 'server.js');
    if (!fs.existsSync(directServer) && fs.existsSync(nestedServer)) {
      try {
        fs.writeFileSync(
          directServer,
          "const path = require('path');\nconst targetDir = path.join(__dirname, 'frontend');\nprocess.chdir(targetDir);\nrequire(path.join(targetDir, 'server.js'));\n"
        );
        console.log(`[sync-build] ✓ Created top-level standalone launcher at ${directServer}`);
      } catch (e) {
        console.error(`[sync-build] Failed to create launcher:`, e.message);
      }
    }
  }
});

// Also mirror rootNext/standalone to rootDir/standalone if it was generated
if (fs.existsSync(path.join(rootNext, 'standalone')) && !fs.existsSync(path.join(rootDir, 'standalone'))) {
  syncDirectory(path.join(rootNext, 'standalone'), path.join(rootDir, 'standalone'));
  console.log(`[sync-build] ✓ Mirrored .next/standalone -> standalone (repository root)`);
}

const rootValid = fs.existsSync(rootNext) && (fs.existsSync(path.join(rootNext, 'BUILD_ID')) || fs.existsSync(path.join(rootNext, 'server')));
const standaloneValid = fs.existsSync(path.join(rootNext, 'standalone')) || fs.existsSync(path.join(rootDir, 'standalone'));
console.log(`[sync-build] Root .next valid: ${rootValid}`);
console.log(`[sync-build] Standalone server bundle valid: ${standaloneValid}`);
