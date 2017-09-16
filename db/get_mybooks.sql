SELECT * from books WHERE (lower(title) like $1 OR lower(author) like $1 or lower(others) like $1) AND  (id in (SELECT book_id from user_books WHERE user_id=$2) LIMIT $3 OFFSET $4;
