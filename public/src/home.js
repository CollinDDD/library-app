function getTotalBooksCount(books) {
  let total = 0;
  for (let i = 0; i < books.length; i++) {
    total = total + 1;
  }
  return total;
}

function getTotalAccountsCount(accounts) {
  let total = 0;
  for (let i = 0; i < accounts.length; i++) {
    total ++;
  }
  return total;
}

function getMostPopularAuthors(books, authors) {
  const authorCounts = authors.map((author) => {
    const count = getBooksBorrowedCount(books, author.id);
    return { name: `${author.name.first} ${author.name.last}`, count };
  });

  const sortedAuthors = authorCounts.sort((a, b) => b.count - a.count);
  return sortedAuthors.slice(0, 5);
}

function getMostCommonGenres(books) {
  let count = {};
  const genres = books.map((bookGenre) => bookGenre.genre)
  for (let i = 0; i < genres.length; i++) {
    const genre = genres[i];
    if (count.hasOwnProperty(genre)) {
      count[genre]++;
    } else {
      count[genre] = 1;
    }
  }
  const genreNamesAndCount = Object.keys(count).map((name) => {
    return { name, count: count[name] };
  });
  const sorted = genreNamesAndCount.sort((a, b) => b.count - a.count);
  return sorted.slice(0, 5);
}


function getMostPopularBooks(books) {
  let result = [];

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const bookObject = {
      name: book.title,
      count: book.borrows.length,
    };
    result.push(bookObject);
  }
  const sorted = result.sort((a, b) => b.count - a.count);
   return sorted.slice(0, 5);
}

function getBooksBorrowedCount(books) {
  let checkedOut = [];
  for (let i = 0; i < books.length; i++) {
    const latestTransaction = books[i].borrows[0];
    if (latestTransaction.returned === false) {
      checkedOut.push(books[i]);
    }
  }
  return checkedOut.length;
}

function getMostPopularAuthors(books, authors) {
  const authorCounts = authors.map((author) => {
    const count = books.reduce((total, book) => {
      if (book.authorId === author.id) {
        return total + book.borrows.length;
      }
      return total;
    }, 0);
    return { name: `${author.name.first} ${author.name.last}`, count };
  });

  const sortedAuthors = authorCounts.sort((a, b) => b.count - a.count);
  return sortedAuthors.slice(0, 5);
}






module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
