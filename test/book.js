process.env.NODE_ENV = 'test';

const Book = require('../models/Book');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Books', () => {
  beforeEach(done => {
    Book.deleteMany({}, err => {
      done();
    });
    
  });

  // Test the /GET route
  describe('/GET books', () => {
    it('it should GET all the books', done => {
      chai.request(server)
        .get('/books')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);

          done();
        });
    });
  });

  // Test the /POST route
  describe('/POST books', () => {
    it('it should not POST a book without the pages field', done => {
      let book = {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        year: 1954,
      };
      chai.request(server)
        .post('/books')
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('pages');
          res.body.errors.pages.should.have.property('kind').eql('required');

          done();
        });
    });

    it('it should POST a book', done => {
      let book = {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        year: 1954,
        pages: 1200,
      };
      chai.request(server)
        .post('/books')
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Book added');
          res.body.book.should.have.property('title');
          res.body.book.should.have.property('author');
          res.body.book.should.have.property('year');
          res.body.book.should.have.property('pages');

          done();
        });
    });
  });

  describe('/GET/:id', () => {
    it('it should GET a book with given id', done => {
      let book = new Book({
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        year: 1954,
        pages: 1200,
      });

      book.save((err, book) => {
        chai.request(server)
          .get('/books/' + book.id)
          .send(book)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title');
            res.body.should.have.property('author');
            res.body.should.have.property('year');
            res.body.should.have.property('pages');
            res.body.should.have.property('_id').eql(book.id);

            done();
          });
      });
    });
  });
});
