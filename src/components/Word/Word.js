import React, {Component} from 'react';
import {connect} from 'react-redux';



class Word extends Component{




render(){

 return (
	<span onClick={(e)=>{this.props.popupHandler(this.props.wordnumber,this.props.wordtext)}}>{this.props.wordtext}</span>
 );
 }
}



function mapStateToProps(state,ownProps){
        if(ownProps && ownProps.history && !(state && state.history))
                return Object.assign({},state,{history:ownProps.history});
        return state;
}

export default connect(mapStateToProps)(Word);


