function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  let checkedOut = [];
  let returned = [];

  for (let i = 0; i < books.length; i++) {
    const latestTransaction = books[i].borrows[0];
    if (latestTransaction.returned === false) {
      checkedOut.push(books[i]);
    } else {
      returned.push(books[i]);
    }
  }
  return [checkedOut, returned];
}

function getBorrowersForBook(book, accounts) {
  const borrowedArray = book.borrows;
  const returned = borrowedArray.filter((borrow) => borrow.returned === true);
  const borrowers = [];
  for (let i = 0; i < accounts.length; i++) {
    
    if (returned.some((borrow) => borrow.id === accounts[i].id)) {
      borrowers.push(accounts[i]);
    }
  }
  borrowers.forEach((returnKey) => {
    returnKey.returned = true
  });
  while (borrowers.length < 10) {
    borrowers.push({});
  }
  return borrowers.slice(0, 10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
