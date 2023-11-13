const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use((err, req, res, next) => {
  let status = 500
  let message = 'Internal server error'

  res.status(status).json({ message })
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});