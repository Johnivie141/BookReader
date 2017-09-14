import React , {Component} from 'react';
import {connect} from 'react-redux';
import {setFilter,setCurrentSQL,getBooks,nextShelf,prevShelf} from '../../store/reducer';
import './Library.css';


class Library extends Component{


componentWillMount(){
	if (this.props && this.props.getBooks && (!this.props.books || this.props.books.length <1)){

		console.log("loading books");
		this.props.getBooks(this.props.bookShelf,this.props.filter);
	}
}
readBook(bookid){
 this.props.setCurrentSQL(bookid);
this.props.history.push('/read');


}

shelfPrevious(){
	console.log("function shelfPrevious");
	if (this.props && this.props.prevShelf && this.props.bookShelf && this.props.bookShelf >0)
	{
		console.log("ready to call reducer function");
	 this.props.prevShelf(this.props.bookShelf -1,this.props.filter);

	}
}

shelfNext(){
	console.log("function shelfNext");
console.log(this.props);
	if (this.props && this.props.nextShelf)
        {
		console.log("ready to call reducer function nextShelf");
         this.props.nextShelf(this.props.bookShelf +1,this.props.filter);
        
        }
}
bookFilterChange(event){
	if (this.props && this.props.setFilter){
		this.props.setFilter(event.target.value);
	        this.props.getBooks(this.props.bookShelf,event.target.value);
	}
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
        
    <div className="library_next_previous">
      <div className="library_previous"><button  className="btn btn-primary" onClick={e=>this.shelfPrevious()}>Previous</button></div>
	<select onChange={(e)=>this.bookFilterChange(e)}>
	<option value="all">All Books</option>
	<option value="mine">My Books</option>
	</select>
      <div className="library_next"> <button className="btn btn-primary"  onClick={e=>this.shelfNext()}>Next</button></div>
        
	
  </div>




        <div className="Books">
	 {Books}
	</div>
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



export default connect(mapStateToProps, {setFilter:setFilter,setCurrentSQL:setCurrentSQL,getBooks:getBooks,nextShelf:nextShelf,prevShelf:prevShelf})(Library);












