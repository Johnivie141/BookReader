DELETE FROM usersettings WHERE user_id=$1 AND keyname=$2;
INSERT INTO usersettings (user_id,keyname,value) VALUES($1,$2,$3);
