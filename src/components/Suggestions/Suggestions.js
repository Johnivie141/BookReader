import React, {Component} from 'react';
import {connect} from 'react-redux';
import{ setLike,getSuggestionText} from '../../store/reducer';
import './Suggestions.css';
import Parser from 'html-react-parser';
import Hammer from 'react-hammerjs';
class Suggestions extends Component
{
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


getText(props){
	console.log("GETTEXT");
	if (props && props.getSuggestionText && !props.currentText){

		console.log("GET SUGGESTION PAGE");
		props.getSuggestionText();
	}
	if (props && props.currentText){
		return Parser("<span>" + props.currentText + "</span>");
	}
	else return '';
}


setlike(likeValue){
	if (this.props && this.props.setLike){
		this.props.setLike(this.props.currentBook,likeValue);
		
	}
}


readBook(event){

  if (this.props && this.props.history)
  {
	this.props.history.push("/read");
  }

}



render(){
	let book_text=this.getText(this.props);
if (this.props)
	{
		console.log(this.props);
	}

	return (
	<div className="Suggestions">
		<div className="Book">

		<Hammer onSwipe={(e)=>this.handleSwipe(e)}>
		<div  onDoubleClick={(e)=>this.readBook(e)}className="BookText">
	 	     {book_text}
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


export default connect(mapStateToProps,{getSuggestionText:getSuggestionText,setLike:setLike})(Suggestions);
