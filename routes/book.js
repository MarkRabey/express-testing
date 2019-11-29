const Book = require('../models/Book');

/**
 * GET /book route to retrieve all books
 */
async function getBooks(req, res) {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    res.send(error);
  }
}

/**
 * POST /book to save a new book
 */
async function postBook(req, res) {
  let newBook = new Book(req.body);
  try {
    await newBook.save();
    res.json({ message: 'Book added', book: newBook });
  } catch (error) {
    res.send(error);
  }
}

/**
 * GET /book/:id to retrieve a book with a given id
 */
async function getBook(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } catch (error) {
    res.send(error);
  }
}

/**
 * DELETE /book/:id to delete a book with a given id
 */
async function deleteBook(req, res) {
  try {
    const result = await Book.deleteOne({ _id: req.params.id });
    res.json({ message: 'Book deleted', result });
  } catch (error) {
    res.send(error);
  }
}

/**
 * PUT /book/:id to update a book with a given id
 */
async function updateBook(req, res) {
  try {
    let book = await Book.findById(req.params.id);
    book = await Object.assign(book, req.body).save();
    res.json({ message: 'Book updated', book });
  } catch (error) {
    res.send(error);
  }
}

module.exports = { getBooks, postBook, getBook, deleteBook, updateBook };
