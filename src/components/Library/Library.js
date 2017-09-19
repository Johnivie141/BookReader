import React , {Component} from 'react';
import {connect} from 'react-redux';
import {setLibrarySearch,setFilter,setCurrentSQL,getBooks,nextShelf,prevShelf} from '../../store/reducer';
import './Library.css';


class Library extends Component{


componentWillMount(){
	if (this.props && this.props.getBooks && (!this.props.books || this.props.books.length <1)){

		this.props.getBooks(this.props.bookShelf,this.props.filter);
	}
}
readBook(bookid){
 this.props.setCurrentSQL(bookid);
this.props.history.push('/read');


}

shelfPrevious(){
	if (this.props && this.props.prevShelf && this.props.bookShelf && this.props.bookShelf >0)
	{
	 this.props.prevShelf(this.props.bookShelf -1,this.props.filter);

	}
}

shelfNext(){
	if (this.props && this.props.nextShelf)
        {
         this.props.nextShelf(this.props.bookShelf +1,this.props.filter);
        
        }
}
bookFilterChange(event){
	if (this.props && this.props.setFilter){
		let newLibraryFilter=event.target.value;
		this.props.setFilter({library:newLibraryFilter});
	        this.props.getBooks(this.props.bookShelf,this.props.filter,{library:newLibraryFilter});
	}
}
useSearchFilter(searchValue)
{
	if (this.props && this.props.setLibrarySearch){

	   this.props.setLibrarySearch(searchValue);
	   this.props.getBooks(this.props.bookShelf,this.props.filter,{searchterm:searchValue});


	}



}
render(){

	let Books='';
	if (this.props && this.props.books){

           Books = this.props.books.map(book=>{
               return (

		       
		       <div className="book" key={book.id} onClick={(e)=>this.readBook(book.id)} >
			 <img src={book["coverImage"]}  alt={book.title} height="182" width="128" />
		       </div>
	       );

	   });
	}

return (
	<div className="Library">
        
    <div className="library_next_previous">
      <div className="library_previous"><button  className="btn btn-primary" onClick={e=>this.shelfPrevious()}>Previous</button></div>

	<div className="Search">
	<input ref="libraryFilter" type="text" className="libraryFilter" /><button className="btn btn-primary" onClick={e=>{this.useSearchFilter(this.refs.libraryFilter.value)}}>Search</button>
	</div>
	
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



export default connect(mapStateToProps, {setLibrarySearch:setLibrarySearch,setFilter:setFilter,setCurrentSQL:setCurrentSQL,getBooks:getBooks,nextShelf:nextShelf,prevShelf:prevShelf})(Library);












