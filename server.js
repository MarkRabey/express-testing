const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/book');

dotenv.config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  dbName: process.env.DATABASE_NAME,
}).catch(error => console.log(error));

const port = process.env.SERVER_PORT || 4567;

const app = express();

app.use(morgan('combined'));
app.use(express.json());
app.get('/', (req, res) => res.json({ message: 'Server is online' }));

app.route('/books')
  .get(bookRoutes.getBooks)
  .post(bookRoutes.postBook);

app.route('/books/:id')
  .get(bookRoutes.getBook)
  .delete(bookRoutes.deleteBook)
  .put(bookRoutes.updateBook);

app.listen(port, () => {
  console.log(`Server listening on port ${ port }`);
});
