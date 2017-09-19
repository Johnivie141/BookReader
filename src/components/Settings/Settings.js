import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Settings.css';
import {changeSettings} from '../../store/reducer';


class Settings extends Component{

constructor(props){
	super(props);
	this.state={
		reloadcount:0
	};

}

FontFamilyChange(event){
  if (this.props && this.props.changeSettings){
	this.props.changeSettings({fontFamily:event.target.value})
   }
}
getVoiceSelector()
{
	var msg = new SpeechSynthesisUtterance();
	var voices = window.speechSynthesis.getVoices();
	var voiceSelector='';
	if (voices && voices.length >0)
	{


		let voiceOptions='';
          voiceOptions = voices.map( (voice,index)=>{

		  return (<option value={voice.name} key={index}>{voice.name} {voice.lang}</option>);
	  })
		if (voiceOptions && voiceOptions.length>0){
			voiceSelector=(<div><span className="VoiceSelectorLabel">Reader Voice</span>
<select onChange={e=>{this.VoiceChange(e)}}> 
          {voiceOptions} 
        </select>
				</div>

			);
		}

	}
         else{
			//reload Page??
		 setTimeout(()=>
			 {
			let reloadCount=this.state.reloadcount;
			if (reloadCount <3)
				reloadCount++;
			this.setState({reloadcount:reloadCount});
			 },1000);
		}



return voiceSelector;



}
VoiceChange(event){
	if (this.props && this.props.changeSettings){
		this.props.changeSettings({voiceName:event.target.value});
	}

}
	render(){


 let voiceSelector = this.getVoiceSelector();








	return (<div className="Settings">
	<div className="FontFamilySelector">
		<span className="FontFamilySelectorLabel">Font Family</span>
		<select onChange={e=>{this.FontFamilyChange(e)}}>
			<option value="Arial">Arial</option>
		        <option value="Comic Sans MS">Comic Sans MS</option>
			<option value="Courier New ">Courier New</option>
                        <option value="Georgia">Georgia</option>
		        <option value="Helvetica">Helvetica</option>
		        <option value="Lucida Console">Lucida Console</option>
		        <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
		 	<option value="Palatino LinoType">Palatino LinoType</option>
		         <option value="Tahoma">Tahoma</option>
			<option value="Times New Roman">Times New Roman</option>
		         <option value="Trebuchet MS">Trebuchet MS</option>
		         <option value="Verdana">Verdana</option>

		    </select>

		{voiceSelector}

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
