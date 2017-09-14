SELECT position,oldWord,newWord FROM spellings WHERE user_id = $1 AND book_id = $2; 
