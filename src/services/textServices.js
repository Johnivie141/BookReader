

module.exports = {
	formatPage: (text)=>{
	 if (text){
               text=text.replace(/\r\n?(\r\n?)+/g,"\r<br />");
	 }
              return text;
         }

}

