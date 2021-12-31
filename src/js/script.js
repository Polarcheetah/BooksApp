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

  function render() {
    for (let book of dataSource.books) {
      /* generate HTML based on template*/
      const generatedHTML = templates.book(book);
      /* create element using utils.createElementFromHTML */
      const element = utils.createDOMFromHTML(generatedHTML);
      //console.log(element);
      /* find menu container */
      const booksContainer = document.querySelector(select.containerOf.books);
      /* add element to menu */
      booksContainer.appendChild(element);
    }
  }

  function initAction() {
    const favoriteBooks = [];
    //const allBooks = document.querySelectorAll(select.all.books);
    const booksList = document.querySelector(select.containerOf.books);

    //console.log(booksList);

    booksList.addEventListener('dblclick', function (event) {
      if (event.target.offsetParent.classList.contains('book__image')) {
        event.preventDefault();
        console.log('element clicked!');
        event.target.offsetParent.classList.add('favorite');
        const bookId = event.target.offsetParent.getAttribute('data-id');
        if (!favoriteBooks.includes(bookId)) {
          favoriteBooks.push(bookId);
        } else {
          const index = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(index, 1);
          event.target.offsetParent.classList.remove('favorite');
        }
        console.log(favoriteBooks);
      }
    });

    const filters = [];
    const filtersForm = document.querySelector(select.containerOf.filters);
    console.log(filters, filtersForm);
    filtersForm.addEventListener('click', function (event) {
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
      console.log(filters);
    });
  }

  render();
  initAction();
}
