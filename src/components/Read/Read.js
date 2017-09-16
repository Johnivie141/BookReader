import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Read.css';
import Hammer from 'react-hammerjs';
import {animatePageTurn,downloadBook,changeWord,setModal,closeModal,DictionaryLookup,getCurrent,getNextPage,getPrevPage} from '../../store/reducer';
import Word from '../Word/Word';
import reactStringReplace from 'react-string-replace';
import Modal from 'react-modal';
import EditWord from '../EditWord/EditWord';
import 'font-awesome/css/font-awesome.min.css';





class Read extends Component
{
	constructor(props){
		super(props);
		this.popupHandler = this.popupHandler.bind(this);
	        this.submitEdit = this.submitEdit.bind(this);
		this.prevPage=this.prevPage.bind(this);
		this.nextPage=this.nextPage.bind(this);
		this.fixText = this.fixText.bind(this);
	
	}


	downloadMyBook(){
		if (this.props && this.props.currentBook && this.props.downloadBook)
		{
			//this.props.downloadBook(this.props.currentBook);
		}
	}
//
	popupHandler(wordNumber , word,originalWord){
             let initialModal =(
		     <div>
		     <h1 className="MainWord" >{(word)?word:''}</h1>
		    <div className="OriginalWord">{(originalWord)?`Original: ${originalWord}`:''}</div>
		     <div className="EditLookup">
		       <div  onClick={e=>{this.createEditWord(wordNumber,word,originalWord)}}>
		        <button className="btn btn-primary" >Edit</button>
		       </div>
		       <div  onClick={e=>{this.props.DictionaryLookup(word)}}>
		        <button className="btn btn-primary" >Lookup</button>
		       </div>
		      </div>
		      </div>
	     );

			

		this.props.setModal(initialModal);

	}




	submitEdit(oldWord,newWord,wordNumber){

		this.props.changeWord(this.props.currentBook,oldWord,newWord,wordNumber,this.props.spellings);

	}

	createEditWord(wordNumber,word,oldword){
         oldword=(oldword)?oldword:word;
		let modalObject=(
			<div>
			<h1>Edit</h1>
			<EditWord wordNumber={wordNumber}  oldword={oldword} submitEdit={this.submitEdit} word={word} /> 
			</div>);

		this.props.setModal(modalObject);
	}


nextPage(){
	if (this.props && this.props.getNextPage && this.props.currentBook)
          this.props.animatePageTurn("nextPageSetup  pageTurnNext");
	     setTimeout(()=>{this.props.getNextPage(this.props.currentBook)},1000);
}

prevPage(){
	if (this.props && this.props.getPrevPage && this.props.currentBook)
	 this.props.animatePageTurn("prevPageSetup pageTurnPrev");
	  setTimeout(e=>{this.props.getPrevPage(this.props.currentBook)},1000);
}



  handleSwipe(ev){
      if (ev.deltaX <-30) this.nextPage();
      else if (ev.deltaX > 30 ) this.prevPage();
  }


  componentWillMount(){
	  

     if (this.props && this.props.user && this.props.getCurrent && (!this.props.currentBook || !this.props.currentText) ){
	    
	    this.props.getCurrent();
     }
  }



 fixText(currentText)
{
if (!currentText) return '';

   let wordcount=0;
                let offset=0;

                let textProp=currentText.replace(/((?:\b\w+)|(?:<wc\d+>))/g,function(match,match1){

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
         let changedWord=this.hasSpellingChange(wordNumber,match,this.props.spellings);
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



return textProp;






}// endFixText


closeModal(){
	this.props.closeModal();
}

hasSpellingChange(position,oldword,spellings){
	if (! spellings || ! spellings.filter) return '';

	let filterArray=spellings.filter(data=>{
           return (data.position===position || (data.position <0 && data.oldword === oldword))
	});
	
	if (filterArray && filterArray.length >0){
		return filterArray[0].newword;
	}
	else return '';
}





render(){
	let downloadLink="";
if (this.props && this.props.currentBook)
	{
	console.log(this.props);
		downloadLink = (<a href={`http://www.booktips.pro:3000/books/${this.props.currentBook}.html`}><i className="fa fa-cloud-download" aria-hidden="true"></i></a>);

        }

		let textProp='';
	if (this.props && this.props.currentText){
         textProp = this.fixText(this.props.currentText);
	}
	else{
		console.log("NO TEXT");
	}







let pageTurn = (this.props && this.props.turnPage)?" " + this.props.turnPage:"";




const modalStyle = {

	overlay:{
		zIndex:10
	},
	content : {
		position: 'relative',
                color:'black',
		width:(this.props && this.props.modalWidth)?this.props.modalWidth:'10vw',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    transform             : 'translate(-50%, -50%)'
  }
};
let settingsStyle={};
if (this.props && this.props.settings)
{
	if (this.props.settings.fontFamily){
		settingsStyle=Object.assign({},settingsStyle,{fontFamily:this.props.settings.fontFamily});
	}
}
        return (
                <div className="Read">
		  <Modal  isOpen={this.props.openModal} style={modalStyle}
                    contentLabel="DictionaryLookup">
                    {(this.props && this.props.modalObject)?this.props.modalObject:''}
                    <button className="btn btn-primary" onClick={()=>this.closeModal()}>close</button>

                  </Modal>



                <div className="BookHeaderFixed">
		<div className="BookHeaderContainer">
                 <div className="BookHeader">

		<div><button onClick={e=>this.prevPage()} className="btn btn-primary">Previous</button></div>
                 <div>{(this.props && this.props.currentTitle)?this.props.currentTitle:''}</div>
		<div>{downloadLink}</div>
		<div><button onClick={e=>this.nextPage()} className="btn btn-primary">Next</button></div>
	</div>	
		
		</div>
		</div>








		<div className="BookContainer">


                <div className={"Book" + pageTurn }>
                <Hammer className="hammerSwipe" onSwipe={(e)=>this.handleSwipe(e)}>
		<div  className="BookText" style={settingsStyle}>
	
		
		{textProp}
                  </div>

                </Hammer>
                </div>
		<div className="Book" style={settingsStyle}>
                <Hammer className="hammerSwipe" onSwipe={(e)=>this.handleSwipe(e)}>
		<div className="BookText" style={settingsStyle}>

		 <span className="invisibleText">{textProp}</span>
		
		</div>
		</Hammer>
		</div>
		</div>
                










                </div>
        );

}




}



function mapStateToProps(state,ownProps){
	if(ownProps && ownProps.history && !(state && state.history))
                return Object.assign({},state,{history:ownProps.history});
        return state;
}



export default connect(mapStateToProps, {animatePageTurn:animatePageTurn,downloadBook:downloadBook,changeWord:changeWord,setModal:setModal,closeModal:closeModal,DictionaryLookup:DictionaryLookup,getCurrent,getNextPage,getPrevPage})(Read);



