import React, { Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getUser,Login} from '../../store/reducer';
import './Main.css'


class Main extends Component{

	constructor(props){
		super(props);

		if (props && props.getUser && !props.user){
			props.getUser();
		}
	}


	myLogin(){
		if (this.props && this.props.Login){
			this.props.Login();
		}
	}


  render(){
	  var logintext=(<li> <a href="http://18.220.207.69:3030/auth">Login</a></li>);
	 
          
	  let loggedIn = false;
	  if (this.props && this.props.user){
		  loggedIn=true;
	  }
if (this.props && this.props.user)
	  {
		   logintext=(
			   <li className="dropdown">
			      <a className="dropdown-toggle" data-toggle="dropdown" href="#">
			   {this.props.user.data.user_name}
			   
			   <span className="caret"></span></a>
			  <ul className="dropdown-menu">
			   <li><a href="#">Settings</a></li>
			   <li><a href="#">Setting2</a></li>
			   </ul>
			  
			  </li>
		   );
	  }



	  return (
	  <div className="Main">

<nav className="navbar navbar-inverse">
  <div className="container-fluid">
    <div className="navbar-header">
      <Link className="navbar-brand" to="/home">BookTips</Link>
    </div>
    <ul className="nav navbar-nav">
      <li className={(loggedIn)?"show":"hide"}><Link to="/library">Library</Link></li>
		  <li className={(loggedIn)?"show":"hide"}><a href="/read">Read</a></li>
	</ul>
<ul className="nav navbar-nav">
      {logintext}
    </ul>
  </div>
</nav>






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



export default connect(mapStateToProps,{Login:Login,getUser:getUser})(Main);

