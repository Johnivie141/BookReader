import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Word.css';


class Word extends Component{




render(){
let wordClass=(this.props.oldword)?"hasOldWord":"";

 return (
	<span  className={wordClass} onClick={(e)=>{this.props.popupHandler(this.props.wordnumber,this.props.wordtext,this.props.oldword)}}>{this.props.wordtext}</span>
 );
 }
}



function mapStateToProps(state,ownProps){
        if(ownProps && ownProps.history && !(state && state.history))
                return Object.assign({},state,{history:ownProps.history});
        return state;
}

export default connect(mapStateToProps)(Word);


