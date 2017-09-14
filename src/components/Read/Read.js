import React, {Component} from 'react';
import {connect} from 'react-redux';
import Parser from 'html-react-parser';
import './Read.css';
import Hammer from 'react-hammerjs';
import {downloadBook,changeWord,setModal,closeModal,DictionaryLookup,getCurrent,getNextPage,getPrevPage} from '../../store/reducer';
import Word from '../Word/Word';
import reactStringReplace from 'react-string-replace';
import Modal from 'react-modal';
import EditWord from '../EditWord/EditWord';






class Read extends Component
{
	constructor(props){
		super(props);
		this.popupHandler = this.popupHandler.bind(this);
	        this.submitEdit = this.submitEdit.bind(this);
	
	
	}


	downloadMyBook(){
		if (this.props && this.props.currentBook && this.props.downloadBook)
		{
			this.props.downloadBook(this.props.currentBook);
		}
	}
//
	popupHandler(wordNumber , word){
             let initialModal =(
		     <div>
		     <h1>Initial Modal</h1>
		     <p onClick={e=>{this.createEditWord(wordNumber,word)}}>
		        Edit {word} 
		      </p>
		      <p onClick={e=>{this.props.DictionaryLookup(word)}}>
		        Lookup {word}
		      </p>
		     </div>
	     )
		;	

		this.props.setModal(initialModal);

	}




	submitEdit(oldWord,newWord,wordNumber){

		this.props.changeWord(this.props.currentBook,oldWord,newWord,wordNumber,this.props.spellings);

	}

	createEditWord(wordNumber,word){
		let modalObject=(
			<div>
			<h1>Edit</h1>
			<EditWord wordNumber={wordNumber} submitEdit={this.submitEdit} word={word} /> 
			</div>);
		this.props.setModal(modalObject);
	}



  handleSwipe(ev){
      if (ev.deltaX <-30) this.props.getNextPage(this.props.currentBook);
      else if (ev.deltaX > 30 ) this.props.getPrevPage(this.props.currentBook);
  }

  componentWillMount(){
	  

     if (this.props && this.props.getCurrent && (!this.props.currentBook || !this.props.currentText) ){
	     this.props.getCurrent();
     }

  }

componentWillReceiveProps(props){
}
componentDidMount(){
	if (this.props){
	}

}

   myLogin(){
                if (this.props && this.props.Login){
                        this.props.Login();
                }
        }

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

	if (this.props && this.props.currentText){
	}
	else{
		console.log("NO TEXT");
	}
   var logintext=(<li> <a href="http://18.220.207.69:3030/auth">Login</a></li>);


          let loggedIn = false;
          if (this.props && this.props.user){
                  loggedIn=true;
          }





if (this.props && this.props.user)
          {
                  logintext=(
                           <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="drop  down" href="#">
                             {this.props.user.data.user_name}
  
                             <span className="caret"></span></a>
                            <ul className="dropdown-menu">
                             <li><a href="#">Settings</a></li>
                             <li><a href="#">Setting2</a></li>
                           </ul>
  
                            </li>
                     );
            }
  


let textProp='';
if (this.props && this.props.currentText){
	let wordcount=0;
	let offset=0;
	textProp=this.props.currentText.replace(/((?:\b\w+)|(?:<wc\d+>))/g,function(match,match1){
         
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

}

const modalStyle = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

        return (
                <div className="Read">
		<Modal isOpen={this.props.openModal} style={modalStyle} 
		  contentLabel="DictionaryLookeup">
		  {(this.props && this.props.modalObject)?this.props.modalObject:''} 
                  <button onClick={()=>this.closeModal()}>close</button>

		</Modal>



                <div className="Book">

        <div onClick={(e)=>this.downloadMyBook()}>Download Book</div>        
                <Hammer onSwipe={(e)=>this.handleSwipe(e)}>
                <div  className="BookText">
                     {textProp}
                  </div>
                </Hammer>
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



export default connect(mapStateToProps, {downloadBook:downloadBook,changeWord:changeWord,setModal:setModal,closeModal:closeModal,DictionaryLookup:DictionaryLookup,getCurrent,getNextPage,getPrevPage})(Read);



