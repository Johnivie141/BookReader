DROP FUNCTION IF EXISTS like_increment(INTEGER,INTEGER,INTEGER);

CREATE FUNCTION like_increment(userid INTEGER,bookid INTEGER,amount INTEGER)
RETURNS INTEGER AS $$
declare
   currentlikes INTEGER;
   totallikes INTEGER;
BEGIN
	
	select likes into currentlikes  from user_books WHERE user_id=userid AND book_id=bookid;

	IF currentlikes is null THEN
		    INSERT INTO user_books (user_id,book_id,likes) VALUES (userid,bookid,0);
         END IF;
	UPDATE user_books set likes = likes + amount  WHERE user_id = userid AND book_id=bookid;


        select likes INTO totallikes FROM books where id =bookid;
	UPDATE books SET likes = totallikes +1 WHERE id =bookid;

	return 0;



END; $$
LANGUAGE PLPGSQL;
