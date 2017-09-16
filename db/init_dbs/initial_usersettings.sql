DROP TABLE IF EXISTS usersettings CASCADE;

CREATE TABLE IF NOT EXISTS usersettings (
	id SERIAL  PRIMARY KEY,
        user_id INTEGER references users(id),
	keyname VARCHAR(64),
	value VARCHAR(64)
	);


	

