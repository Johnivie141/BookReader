DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE IF NOT EXISTS users (
	id SERIAL  PRIMARY KEY,
	auth_id VARCHAR(64),
	user_name VARCHAR(128),
	email VARCHAR(128),
	currentbook INTEGER,
        img TEXT
	);


	
	INSERT INTO users ("auth_id","user_name","email")
  VALUES
   (1,'John Ivie','john.ivie@gmail.com'),
   (2,'Yekaterina Ivie','katyaivie@hotmail.com')
;

