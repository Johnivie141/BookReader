DROP TABLE IF EXISTS user_books CASCADE;
CREATE TABLE IF NOT EXISTS user_books (
	user_id INTEGER references users(id),
	book_id INTEGER references books(id),
	likes INTEGER
	);



	

