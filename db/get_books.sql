SELECT * from books WHERE (lower(title) LIKE $1 OR lower(author) LIKE $1 OR lower(others) LIKE $1) LIMIT $2 OFFSET $3;
