import path from 'path';
import express from 'express';

const app = express();

app.use(express.static(path.join(__dirname, './public')));

app.listen(3000, function () {
  console.log('Listening on port 3000');
});