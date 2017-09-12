DROP TABLE IF EXISTS spellings CASCADE;

CREATE TABLE IF NOT EXISTS spellings (
	id SERIAL  PRIMARY KEY,
	user_id INTEGER references users(id), 
	book_id INTEGER references books(id),
	position INTEGER,
        oldWord VARCHAR(32),
	newWord VARCHAR(32)
	);


	

