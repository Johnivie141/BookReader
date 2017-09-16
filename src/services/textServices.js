import EditWord from '../components/EditWord/EditWord';
import Word from '../components/Word/Word';
import reactStringReplace from 'react-string-replace';


function TextFixes(currentText){
	return new Promise( function(resolve,reject){
       let wordcount=0;
		let offset=0;

		textProp=currentText.replace(/((?:\b\w+)|(?:<wc\d+>))/g,function(match,match1){

                if (match.indexOf("<wc") === -1){
                        wordcount++;
                }
                else{
                        if (offset ===0){
                                match1=match.replace(/[^\d]+/g,"");
                                offset = +match1  - wordcount;
                                if (offset <0) offset=0;
                        }
                }
                return match;
        });



  textProp = textProp.replace(/<wc[0-9]+>/g,"");


wordcount=0;
let lines=textProp.match(/.*/g);

        textProp = lines.map(line=>{
            if (line.length <40 && line.length >0)
                {
                    return line + "<br />";
                }
            if (/[A-Z]{3}/.test(line) && ! /[a-z]/.test(line))
                     return line + "<br />";
           return line;
        }).join("\n");

textProp = textProp.replace(/\r\n?(\r\n?)+/g,"\r<br />");

        textProp = reactStringReplace(textProp,/\b(\w+)(?!(?:(?:\w)|(?: \/>)))/g, (match,i)=>{

        let wordNumber= wordcount + offset;
                wordcount++;
        let wordKey= "word" + wordNumber;
        if (this.hasSpellingChange(wordNumber,match,this.props.spellings)){
                console.log("MATCH");
         let changedWord=this.hasSpellingChange(wordNumber,match,this.props.spellings);
                console.log("CHANGED TO " + changedWord);
                return (
                 <Word popupHandler={this.popupHandler} wordnumber={wordNumber} wordtext={changedWord} oldword={match}  key={wordKey}/>)

        }
        else{

        return(
        <Word popupHandler={this.popupHandler} wordnumber={wordNumber} wordtext={match} key={wordKey}/>)
        }
        })

let brcount=0;
textProp= reactStringReplace(textProp,/<br \/>/g,(match,i)=>{

 brcount++;
 let brkey = "br" + brcount;
return (<br key={brkey}/>)

});


textProp= (<span key="topspan">{textProp}</span>);

    resolve(textProp);




	
	}) // end Promise
}





module.exports = {
	formatPage: (text)=>{
	 if (text){
               text=text.replace(/\r\n?(\r\n?)+/g,"\r<br />");
	 }
              return text;
         }

}

