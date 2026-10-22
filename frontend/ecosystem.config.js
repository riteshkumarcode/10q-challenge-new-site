module.exports = {
  apps: [
    {
      name: '10q-challenge-frontend',
      script: 'server.js',
      cwd: __dirname,
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/pm2-err.log',
      out_file: './logs/pm2-out.log',
      combine_logs: true
    }
  ]
};
