import React, { Component} from 'react';
import {connect} from 'react-redux';
import './Main.css'
import './reset.css';

class Main extends Component{



  render(){
	 
          
	  return (
	  <div className="Main">
           </div>
);








  }


}

function mapStateToProps(state,ownProps){
	
	if (ownProps && ownProps.history && !(state && state.history)){
            return Object.assign({},state,{history:ownProps.history});
	}
return state;
}



export default connect(mapStateToProps)(Main);

