import express from 'express';
import { Game } from './game';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/game', (req, res) => {
  res.send('We are gaming! WICKED');
  const game = new Game();
  game.start();
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
