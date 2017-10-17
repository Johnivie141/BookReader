import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Nav.css';
import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import {getUser, getSettings} from '../../store/reducer'; 




export class Nav extends Component{

 constructor(props){
                super(props);

                if (props && props.getUser && !props.user){
                        props.getUser();
                }
        }




	render(){
		
        let  logintext=(<li> <a href="https://www.booktips.pro:8443/auth">Login</a></li>);
          let loggedIn = false;

if (this.props && this.props.user)
          {
                  loggedIn=true;
		  if (this.props.getSettings && (!this.props.settings  || !this.props.settings["user_id"])  ){
			  this.props.getSettings();

		  }
                  logintext=(
                           <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                             {(this.props && this.props.user && this.props.user.user_name)?this.props.user.user_name:''}

                             <span className="caret"></span></a>
                            <ul className="dropdown-menu navbar-nav nav  navbar-inverse">
                             <li><Link to="/settings">Settings</Link></li>
                             <li><a href="ihttps://john141.auth0.com/v2/logout?returnTo=https%3A%2F%2Fwww.booktips.pro:8443%2F/home">Logout</a></li>
                           </ul>

                            </li>
                     );
            }




 return (
	 <nav className="navbar navbar-inverse  navbar-fixed-top">
  <div className="container-fluid">
    <div className="navbar-header">
      <Link className="navbar-brand" to="/home">BookTips</Link>
    </div>
    <ul className="nav navbar-nav">
      <li className={(loggedIn)?"show":"hide"}><Link to="/library">Library</Link></li>
      <li className={(loggedIn)?"show":"hide"}><Link to="/read">Read</Link></li>
      <li className={(loggedIn)?"show":"hide"}><Link to="/suggestions">Tips</Link></li>
      <li className={(loggedIn)?"show":"hide"}><Link to="/about">About</Link></li>
        </ul>
<ul className="nav navbar-nav">
      {logintext}
    </ul>
  </div>
</nav>
 );






	} //END RENDER

}
function mapStateToProps(state,ownProps){
        if(ownProps && ownProps.history && !(state && state.history))
                return Object.assign({},state,{history:ownProps.history});
        return state;
}




export default connect(mapStateToProps,{getSettings:getSettings,getUser:getUser})(Nav);
