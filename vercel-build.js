const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Running Vercel build script...');

// Ensure the public directory exists
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  console.log('Creating public directory...');
  fs.mkdirSync(publicDir, { recursive: true });
}

// Install production dependencies
console.log('Installing production dependencies...');
try {
  execSync('npm install --production', { stdio: 'inherit' });
  console.log('Dependencies installed successfully');
} catch (error) {
  console.error('Error installing dependencies:', error);
  process.exit(1);
}

console.log('Vercel build completed successfully');
