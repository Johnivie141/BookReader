import React, {Component} from 'react'
import {connect} from 'react-redux';



class EditWord extends Component
{

	render(){
		return (
           <div className="EditWord">
			<input defaultValue={(this.props && this.props.word)?this.props.word:''} type="text" ref="wordChangeInput" />
			<button className="LocalButton btn btn-primary"onClick={e=>this.props.submitEdit(this.props.oldword,this.refs.wordChangeInput.value,this.props.wordNumber)}>Local</button>
			<button className="GlobalButton btn btn-primary" onClick={e=>this.props.submitEdit(this.props.oldword,this.refs.wordChangeInput.value,-1)}>Global</button>

		</div>
		);

	}
}


function mapStateToProps(state,ownProps){
	if (ownProps && ownProps.history && !(state & state.history))
		 return Object.assign({},state,{history:ownProps.history});
	return state;
}
export default connect(mapStateToProps)(EditWord);
