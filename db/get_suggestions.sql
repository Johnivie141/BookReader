SELECT SUM(hits +books.likes) as hits_and_likes,* from books WHERE books.id NOT IN (SELECT book_id from user_books WHERE user_id=$1) AND books.author IN (select author FROM books where books.id in (SELECT book_id from user_books WHERE user_id=$1)) GROUP BY id ORDER BY hits_and_likes DESC limit 1;
SELECT SUM(hits +books.likes) as hits_and_likes,* from books WHERE books.id NOT IN (SELECT book_id from user_books WHERE user_id=$1) GROUP BY id ORDER BY hits_and_likes DESC limit 1;
SELECT SUM(hits +books.likes) as hits_and_likes, books.* from books WHERE books.id NOT IN (SELECT book_id from user_books WHERE user_id=3) AND books.author IN (select author FROM books where books.id in (SELECT book_id from user_books WHERE user_id=3)) GROUP BY id ORDER BY hits_and_likes DESC limit 1;

