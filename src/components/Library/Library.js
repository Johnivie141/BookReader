import React , {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {setCurrentSQL,getBooks} from '../../store/reducer';
import './Library.css';


class Library extends Component{


componentWillMount(){
	if (this.props && this.props.getBooks && (!this.props.books || this.props.books.length <1)){

		console.log("loading books");
		this.props.getBooks(this.props.bookShelf);
	}
}
readBook(bookid){
 this.props.setCurrentSQL(bookid);
this.props.history.push('/read');


}

render(){

	let Books='';
	if (this.props && this.props.books){

           Books = this.props.books.map(book=>{
               return (
		       <div className="book" key={book.id} onDoubleClick={(e)=>this.readBook(book.id)} >
			 <img src={book["coverImage"]}  alt={book.title} height="182" width="128" />
		       </div>
	       );

	   });
	}

return (
	<div className="Library">
	{Books}
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



export default connect(mapStateToProps, {setCurrentSQL:setCurrentSQL,getBooks:getBooks})(Library);












