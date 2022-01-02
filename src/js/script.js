/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  ('use strict');
  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      books: '.books-list',
      filters: '.filters',
    },
    all: {
      books: '.book__image',
    },
  };

  const templates = {
    book: Handlebars.compile(
      document.querySelector(select.templateOf.book).innerHTML
    ),
  };

  const classNames = {
    bookList: {
      bookImage: 'book__image',
      favoriteBook: 'favorite',
    },
  };

  const filters = [];

  class BooksList {
    constructor() {
      const thisBooksList = this;
      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initAction();
    }
    initData() {
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
    }
    getElements() {
      const thisBooksList = this;
      thisBooksList.booksList = document.querySelector(
        select.containerOf.books
      );
      thisBooksList.filtersForm = document.querySelector(
        select.containerOf.filters
      );
    }

    render() {
      const thisBooksList = this;
      for (let book of thisBooksList.data) {
        /*add styles to rating*/
        const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;
        /* generate HTML based on template*/
        const generatedHTML = templates.book({
          name: book.name,
          price: book.price,
          id: book.id,
          image: book.image,
          rating: book.rating,
          ratingWidth: ratingWidth,
          ratingBgc: ratingBgc,
        });
        /* create element using utils.createElementFromHTML */
        thisBooksList.element = utils.createDOMFromHTML(generatedHTML);
        /* find menu container */
        const booksContainer = document.querySelector(select.containerOf.books);
        /* add element to menu */
        booksContainer.appendChild(thisBooksList.element);
        console.log('thisBooksList.element:', thisBooksList.element);
      }
    }

    initAction() {
      const thisBooksList = this;
      const favoriteBooks = [];
      //const allBooks = document.querySelectorAll(select.all.books);
      //const booksList = document.querySelector(select.containerOf.books);

      //console.log(booksList.innerHTML);

      thisBooksList.booksList.addEventListener('dblclick', function (event) {
        event.preventDefault();
        if (
          event.target.offsetParent.classList.contains(
            classNames.bookList.bookImage
          )
        ) {
          console.log('element clicked!');
          event.target.offsetParent.classList.add(
            classNames.bookList.favoriteBook
          );
          const bookId = event.target.offsetParent.getAttribute('data-id');
          if (!favoriteBooks.includes(bookId)) {
            favoriteBooks.push(bookId);
          } else {
            const index = favoriteBooks.indexOf(bookId);
            favoriteBooks.splice(index, 1);
            event.target.offsetParent.classList.remove(
              classNames.bookList.favoriteBook
            );
          }
          console.log(favoriteBooks);
        }
      });

      //const filtersForm = document.querySelector(select.containerOf.filters);
      console.log(filters, thisBooksList.filtersForm);
      thisBooksList.filtersForm.addEventListener('click', function (event) {
        if (
          event.target.tagName === 'INPUT' &&
          event.target.type === 'checkbox' &&
          event.target.name === 'filter'
        ) {
          console.log(event.target.value);
          if (event.target.checked) {
            console.log('filter checked');
            filters.push(event.target.value);
          } else {
            console.log('filter unchecked');
            const indexOfUnchecked = filters.indexOf(event.target.value);
            filters.splice(indexOfUnchecked, 1);
          }
        }
        console.log('filters:', filters);
        thisBooksList.filterBooks();
      });
    }

    filterBooks() {
      const thisBooksList = this;
      console.log(thisBooksList);
      for (let book of thisBooksList.data) {
        //console.log(book);
        const hiddenBook = document.querySelector(
          `.book__image[data-id="${book.id}"]`
        );
        if (
          (filters.includes('adults') && book.details.adults === false) ||
          (filters.includes('nonFiction') && book.details.nonFiction === false)
        ) {
          hiddenBook.classList.add('hidden');
        } else {
          hiddenBook.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating) {
      const thisBooksList = this;
      console.log(thisBooksList);

      switch (true) {
        case rating <= 6:
          return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
        case rating > 6 && rating <= 8:
          return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
        case rating > 8 && rating <= 9:
          return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
        case rating > 9:
          return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
        default:
          return 'linear-gradient(to bottom,  #f8f9f9 0%, #626567 100%)';
      }
    }
  }

  const app = new BooksList();
  console.log('app:', app);
}
