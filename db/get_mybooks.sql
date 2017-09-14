SELECT * from books WHERE id in (SELECT book_id from user_books WHERE user_id=$1) LIMIT $2 OFFSET $3;
