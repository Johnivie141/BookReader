import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Settings.css';
import {changeSettings} from '../../store/reducer';


class Settings extends Component{

FontFamilyChange(event){
  if (this.props && this.props.changeSettings){
	this.props.changeSettings({fontFamily:event.target.value})
   }
}
	render(){

	return (<div className="Settings">
	<div className="FontFamilySelector">
		<span className="FontFamilySelectorLabel">Font Family</span>
		<select onChange={e=>{this.FontFamilyChange(e)}}>
			<option value="Times New Roman">Times New Roman</option>
			<option value="Arial">Arial</option>
			<option value="Helvetica">Helvetica</option>

			<option value="Courier New ">Courier New</option>
			<option value="Lucida Console">Lucide Console</option>
		    </select>
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

export default connect(mapStateToProps,{changeSettings:changeSettings})(Settings);
