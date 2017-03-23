const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.use('/', express.static(path.join(__dirname, '/')));

app.listen(8000, () => {
  console.log('Server listening on port 8000');
});
