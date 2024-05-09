const express = require('express');
const app = express();

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('inside router');
  next();
})

app.use(router);

app.use((req, res, next) => {
  console.log('saying hello');
  res.header('Content-Type', 'application/json').status(302).send({ message: 'SUCCESS'});
})


app.listen(4330, () => {
  console.log('listening on port 4330');
})