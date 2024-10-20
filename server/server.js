const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;

app.use(cors());

app.get("/api/home", (req, res) => {
    res.json({ message: "Hello World!" });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

let grid = new Array(64 * 256).fill(0);

app.use(express.json());

app.get('/api/getGrid', (req, res) => {
  res.json({ grid });
});

app.post('/api/updateGrid', (req, res) => {
  const { x, y, on } = req.body;
  const index = y * 256 + x;
  if (index >= 0 && index < grid.length) {
    grid[index] = on;
    res.status(200).send('Grid updated');
  } else {
    res.status(400).send('Invalid coordinates');
  }
  console.log(grid)
});

app.post('/api/clearGrid', (req, res) => {
    grid.fill(0);
    res.status(200).send('Grid cleared');
  });