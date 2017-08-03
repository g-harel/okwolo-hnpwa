const express = require('express');
const path = require('path');
const compression = require('compression');

const port = 8080;

const assetsPath = path.join(__dirname, '../../dist');

const app = express();

app.use(compression());

app.get('/(**/)?:name.:extension', (req, res) => {
  const { name, extension } = req.params;
  const filePath = req.params[0] || '';
  res.sendFile(path.join(assetsPath, filePath, `${name}.${extension}`));
});

app.get('**', (req, res) => {
  res.sendFile(path.join(assetsPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`running at ${port} at ${Date.now()}`);
});
