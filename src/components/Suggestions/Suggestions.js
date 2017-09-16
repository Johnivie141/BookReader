
import React, {Component} from 'react';
import {connect} from 'react-redux';
import{ setLike,getSuggestionText} from '../../store/reducer';
import './Suggestions.css';
import Parser from 'html-react-parser';
import Hammer from 'react-hammerjs';
import reactStringReplace from 'react-string-replace';

class Suggestions extends Component
{
setlike(likeValue){
	if (this.props && this.props.setLike){
		this.props.setLike(this.props.currentBook,likeValue);
		
	}
}


fixText(currentText)
{
	if (!currentText) return '';
let textProp = currentText;
textProp = textProp.replace(/<wc[0-9]+>/g,"");

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

let brcount=0;
  textProp= reactStringReplace(textProp,/<br \/>/g,(match,i)=>{
  
   brcount++;
   let brkey = "br" + brcount;
  return (<br key={brkey}/>)
  
  });




	return textProp;
}


 handleSwipe(ev) {
        console.log(ev.type);
	if (ev.deltaX <-30)
	 {
		 console.log("swipe left");
		 this.setlike(-1);
	 }
	 if (ev.deltaX >30)
	 {
		 console.log("swipe right");
		 this.setlike(1);
	 }
    }	


	componentWillMount()
	{
		if (this.props && this.props.getSuggestionText && !this.props.currentText)
			this.props.getSuggestionText();

	}

     componentWillReceiveProps(props)
        {
                if (props && props.getSuggestionText && !props.currentText)
                        props.getSuggestionText();
        }






readBook(event){

  if (this.props && this.props.history)
  {
	this.props.history.push("/read");
  }

}



render(){
if (this.props)
	{
		console.log(this.props);
	}

let textProp ='';
	if (this.props && this.props.currentText){
		textProp = this.fixText(this.props.currentText);
	}
	return (
	<div className="Suggestions">

		<div className="TipBookHeaderFixed">
		<div className="TipBookHeaderContainer">
		 <div className="TipBookHeader">

                <div><button onClick={e=>{this.setlike(1)}} className="btn btn-primary"><i className="fa fa-heart"></i></button></div>
                <div><button onClick={e=>{this.setlike(-1)}} className="btn btn-primary"><i className="fa fa-trash"></i></button></div>

                </div>
		</div>
                </div>
		
		<div className="TipBookContainer">
		<div className="TipBook">
		<Hammer onSwipe={(e)=>this.handleSwipe(e)}>
		<div  onDoubleClick={(e)=>this.readBook(e)} className="TipBookText">
	 	     {textProp}
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


export default connect(mapStateToProps,{getSuggestionText:getSuggestionText,setLike:setLike})(Suggestions);
