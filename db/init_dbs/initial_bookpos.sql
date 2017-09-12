DROP TABLE IF EXISTS bookpos CASCADE;
CREATE TABLE IF NOT EXISTS bookpos (
	user_id INTEGER references users(id),
	book_id INTEGER references books(id),
	pos INTEGER
	);


	

