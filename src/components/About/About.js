import React, {Component} from 'react';
import {connect} from 'react-redux';
import './About.css';
import {getAuthorBio,getBookDescription} from'../../store/reducer';





class About extends Component{


	componentWillMount()
	{
		if (this.props && this.props.getAuthorBio && !this.props.AuthorBio)
		{
			this.props.getAuthorBio(this.props.currentBook);
		}
		if (this.props && this.props.getBookDescription && !this.props.BookDescription){
			this.props.getBookDescription(this.props.currentBook);
		}
	}
   componentWillReceiveProps(props) 
        { 
                if (props && props.getAuthorBio && !props.AuthorBio) 
                { 
                        props.getAuthorBio(props.currentBook); 
                } 
                if (props && props.getBookDescription && !props.BookDescription){ 
                        props.getBookDescription(props.currentBook); 
                } 
        } 



	render(){
		





		return (
			<div className="About">
			  <div className="Author">
			   {(this.props.AuthorBio)?this.props.AuthorBio:''}
			  </div>
			<br/>
			<br/>
			  <div className="Description">
			   {(this.props.BookDescription)?this.props.BookDescription:''}
			  </div>
			</div>
		);



      }
}

function mapStateToProps(state,ownProps){
console.log("state change");
        if(ownProps && ownProps.history && !(state && state.history))
                return Object.assign({},state,{history:ownProps.history});
        return state;
}


export default connect(mapStateToProps,{getAuthorBio:getAuthorBio,getBookDescription:getBookDescription})(About);


