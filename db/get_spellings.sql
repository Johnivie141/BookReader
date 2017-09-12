SELECT position,oldWord,newWord FROM spellings WHERE user_id = $1 AND book_id = $2 AND position< $4 AND (position >$3 OR position <0)
