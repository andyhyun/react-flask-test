const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

let fakeDatabase = [
  {score: 121, user_id: 2},
  {score: 73, user_id: 3},
  {score: 114, user_id: 2},
  {score: 96, user_id: 1},
];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/scores', async (req, res) => {
  try {
    const { wpm, userId } = req.body;
    await fakeDatabase.push({ score: wpm, user_id: userId});
    res.send('Success adding score!');
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/api/scores', async (req, res) => {
  try {
    const allScores = await fakeDatabase;
    res.json(allScores);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userScores = await fakeDatabase.filter(record => record.user_id === parseInt(userId));
    res.json(userScores);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
