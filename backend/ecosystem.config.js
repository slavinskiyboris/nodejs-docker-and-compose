module.exports = {
  apps: [
    {
      name: 'app',
      script: './dist/main.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}; 