DELETE FROM spellings WHERE user_id = $1 AND book_id=$2 AND position =$5;
INSERT INTO spellings (user_id,book_id,oldword,newword,position) VALUES ($1,$2,$3,$4,$5);
