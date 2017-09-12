DELETE FROM bookpos WHERE book_id=$2 AND user_id=$1;
INSERT INTO bookpos ("user_id","book_id","pos") VALUES ($1,$2,$3);
