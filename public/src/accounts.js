function findAccountById(accounts, id) {
return accounts.find((account) => account.id === id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase().localeCompare(accountB.name.last.toLowerCase()))
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  let result = 0;

  for (let i = 0; i < books.length; i++) {
    const borrows = books[i].borrows;
    for (let j = 0; j < borrows.length; j++) {
      if (borrows[j].id === accountId) {
        result += 1;
      }
    }
  }

  return result;
}


function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;

  return books
    .filter((book) =>
      book.borrows.some(
        (borrow) => borrow.id === accountId && !borrow.returned
      )
    )
    .map((book) => ({
      ...book,
      author: authors.find((author) => author.id === book.authorId),
    }));
}
module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
