// This file is the entry point for Vercel Serverless Functions
const { app } = require('../src/app');

module.exports = (req, res) => {
  console.log('Vercel Serverless Function invoked');
  return app(req, res);
};
