import React from 'react';
import Parser from 'html-react-parser';
import {apiGetSettings,apiSetSettings,apiDownload,apiChangeSpelling,apiGetAuthorBio,apiGetBookDescription,apiMerriamDictionary,apiGetCurrent,apiSetCurrent,apiGetNextPage,apiGetPrevPage,apiSetLike,apiGetSuggestionText,apiGetBooks,apiGetBookById,apiGetBooksByAuthor,apiGetSuggestions,apiGetUser,apiLogin} from '../services/apiServices';


const FULFILLED="_FULFILLED";
const GET_BOOKS="GET_BOOKS";

const GET_USER="GET_USER";

const GET_BOOK_BY_ID="GET_BOOKS_BY_ID";

const GET_BOOKS_BY_AUTHOR="GET_BOOKS_BY_AUTHOR";

const GET_SUGGESTIONS="GET_SUGGESTIONS";

const LOGIN ="LOGIN";
const GET_SUGGESTION_TEXT="GET_SUGGESTION_TEXT";

const SET_LIKE="SET_LIKE";

const GET_NEXT_PAGE ="GET_NEXT_PAGE";
const GET_PREV_PAGE="GET_PREV_PAGE";

const INC_BOOKSHELF="INC_BOOKSHELF";

const SET_CURRENT_SQL="SET_CURRENT_SQL";
const GET_CURRENT="GET_CURRENT";
const DICTIONARY_LOOKUP = "DICTIONARY_LOOKUP";
const CLOSE_MODAL="CLOSE_MODAL";

const SET_MODAL = "SET_MODAL";

const GET_AUTHOR_BIO="GET_AUTHOR_BIO";
const GET_BOOK_DESCRIPTION="GET_BOOK_DESCRIPTION";
const CHANGE_SPELLING="CHANGE_SPELLING";

const NEXT_SHELF="NEXT_SHELF";
const PREV_SHELF="PREV_SHELF";

const SET_FILTER="SET_FILTER";
const DOWNLOAD="DOWNLOAD";
const ANIMATE_PAGE_TURN="ANIMATE_PAGE_TURN";

const GET_SETTINGS="GET_SETTINGS";
const CHANGE_SETTINGS="CHANGE_SETTINGS";
const SET_LIBRARY_FILTER="SET_LIBRARY_FILTER";


const START_READING="START_READING";
const STOP_READING="STOP_READING";
const SET_READER_TIME="SET_READER_TIME";
const UPDATE_READER_POSITION="UPDATE_READER_POSITION";
const END_READER_TEXT="END_READER_TEXT";

export function endReaderText(){
	return {
		type :END_READER_TEXT,
		payload:null
	}
}

export function updateReaderPosition(newPosition){
	return {
		type:UPDATE_READER_POSITION,
		payload:newPosition
	}
}

export function startReading(){
	return {
		type:START_READING,
		payload:null,
	}
}
export function stopReading(){
	return {
		type:STOP_READING,
		payload:null
	}
}
export function setReaderTime(minutes){
	return {
		type:SET_READER_TIME,
		payload:minutes
	}
}


export function setLibrarySearch(filter){
	return {
		type:SET_LIBRARY_FILTER,
		payload:filter
	}
}
export function changeSettings(newSettings){
	return {
		type:CHANGE_SETTINGS,
		payload:apiSetSettings(newSettings)
	}
}
export function getSettings(){
	return {
		type:GET_SETTINGS,
		payload:apiGetSettings()
	}
}

export function  animatePageTurn(turnClass){
	return {
		type:ANIMATE_PAGE_TURN,
		payload:turnClass
	}
}
export function downloadBook(bookid)
{
	return {
		type:DOWNLOAD,
		payload:apiDownload(bookid)
	}
}
export function setFilter(filter){
	return {
		type:SET_FILTER,
		payload:filter
	}
}
export function nextShelf(shelf,filter){
	return {
		type:NEXT_SHELF,
		payload:apiGetBooks(shelf,filter)
	}
}
export function prevShelf(shelf,filter){
	return {
		type:PREV_SHELF,
		payload:apiGetBooks(shelf,filter)
	      }
}


export function changeWord(bookid,oldWord,newWord,position,spellings){
	return {
		type: CHANGE_SPELLING,
		payload:apiChangeSpelling(bookid,oldWord,newWord,position,spellings)
	}
}

export function setModal(modalText){
	return {
		type:SET_MODAL,
		payload:modalText
	}
}


export function getBookDescription(bookid){
	 return {
		 type:GET_BOOK_DESCRIPTION,
		 payload:apiGetBookDescription(bookid)
	 }
}
export function getAuthorBio(bookid){
	return {
		type:GET_AUTHOR_BIO,
		payload:apiGetAuthorBio(bookid)
	}
}



export function closeModal(){
	return {
		type:CLOSE_MODAL,
		payload:null
	}
}




export function DictionaryLookup(word){
     return {
	type:DICTIONARY_LOOKUP,
        payload:apiMerriamDictionary(word)
     }
}
export function getCurrent(){
	return {
		type:GET_CURRENT,
		payload:apiGetCurrent()
	}
}


export function setCurrentSQL(bookid){
	return {
		type:SET_CURRENT_SQL,
		payload:apiSetCurrent(bookid)
	}
}



export function incBookshelf(){
	return {
		type:INC_BOOKSHELF,
		payload:1
	}
}


export function getPrevPage(bookid){
	//window.scrollTo(0,0);
	return {
		type:GET_PREV_PAGE,
		payload:apiGetPrevPage(bookid)
	}              
}

export function getNextPage(bookid){

	//window.scrollTo(0,0);
	return {
              type:GET_NEXT_PAGE,
	      payload:apiGetNextPage(bookid)
	 }
}


export function setLike(bookid,like){
	return {
		type:SET_LIKE,
		payload:apiSetLike(bookid,like)
	}
}

export function getSuggestionText(){
          return {
		  type:GET_SUGGESTION_TEXT,
		  payload:apiGetSuggestionText()
	  }
}
export function Login(){
	return {
		type:LOGIN,
		payload:apiLogin()
	}
}
export function getBooks(bookShelf,filter,filterChange){
	return {
		type:GET_BOOKS,
		payload:apiGetBooks(bookShelf,filter,filterChange)
	}
}

export function getUser(){
	return {
		type:GET_USER,
		payload:apiGetUser()
	}
}
export function GetBookById(id){
	return {
		type:GET_BOOK_BY_ID,
		payload:apiGetBookById(id)
	}
}

export function GetBooksByAuthor(author){
	return {
		type:GET_BOOKS_BY_AUTHOR,
		payload:apiGetBooksByAuthor(author)
	}
}

export function getSuggestions(){
	return {
		type:GET_SUGGESTIONS,
		payload:apiGetSuggestions()
	}
}




let initialState={
	readerPosition:{start:0,end:0,text:''},
	isReading:false,
	user:null,
	books:[],
    	bookShelf:0,
	currentText:'',
	currentBook:null,
        currentTitle:'',
	openModal:false,
	AuthorBio:'',
	BookDescription:'',
        modalObject:null,
        modalWidth:'400px',
	spellings:[],
	filter:{library:"all",searchterm:''},
	localBooks:[],
	turnPage:'',
	settings:{fontFamily:"Times New Roman"}
}




export default function reducer(state=initialState,action){
	switch(action.type)
	{
		case END_READER_TEXT:
			let newReaderPosition=Object.assign({},state.readerPosition,{text:''});
			return Object.assign({},state,{readerPosition:newReaderPosition});

		case START_READING:
			return Object.assign({},state,{isReading:true,readerPosition:{start:0,end:0,text:''}});
		case STOP_READING:
			return Object.assign({},state,{isReading:false,readerPosition:{start:0,end:0,text:''}});
		case UPDATE_READER_POSITION:
			
				return Object.assign({},state,{readerPosition:action.payload});
		
		
		
		
		
		
		
		
	case SET_LIBRARY_FILTER: 
			
	     return Object.assign({},state,{bookShelf:0,filter:Object.assign({},state.filter,{searchterm:action.payload})});

	case GET_SETTINGS +FULFILLED:

			let newSettingsArray = Object.assign({},state.settings,action.payload,{"user_id":state.user.id});
			return Object.assign({},state,{settings:newSettingsArray});

	case CHANGE_SETTINGS+ FULFILLED:
			let newSettings = Object.assign({},state.settings,action.payload);
			return Object.assign({},state,{settings:newSettings});

	case ANIMATE_PAGE_TURN:
			return Object.assign({},state,{turnPage:action.payload});

	case DOWNLOAD + FULFILLED:

			let newLocalBooks = state.localBooks.slice(0);
			newLocalBooks.push(action.payload);
	     return Object.assign({},state,{LocalBooks:newLocalBooks});

		
	case SET_FILTER:
	     return Object.assign({},state,{bookShelf:0,filter:Object.assign({},state.filter,action.payload)});

	case NEXT_SHELF + FULFILLED:
			let nextShelf = state.bookShelf +1;
			return Object.assign({},state,{bookShelf:nextShelf,books:action.payload});
	case PREV_SHELF +FULFILLED:
			return Object.assign({},state,{bookShelf:state.bookShelf -1,books:action.payload});
	case CHANGE_SPELLING + "_PENDING":
		
                    return Object.assign({},state,{modalObject:null,openModal:false});
	case CHANGE_SPELLING + FULFILLED:
	
			return Object.assign({},state,{spellings:action.payload,modalObject:null,openModal:false});

	case GET_AUTHOR_BIO + FULFILLED:
			return Object.assign({},state,{AuthorBio:action.payload});
	case GET_BOOK_DESCRIPTION + FULFILLED:
			return Object.assign({},state,{BookDescription:action.payload});


	case CLOSE_MODAL:
			return Object.assign({},state,{modalObject:null,openModal:false});

	case SET_MODAL:
			return Object.assign({},state,{modalWidth:'400px',openModal:true,modalObject:action.payload});
	case DICTIONARY_LOOKUP + FULFILLED:
			let modalObject = (<div><h1>{action.payload.word}</h1><p>{Parser(action.payload.meaning)}</p></div>);

			return Object.assign({},state,{modalObject:modalObject,openModal:true,modalWidth:'800px'});
	case SET_CURRENT_SQL + FULFILLED:
			return Object.assign({},state,{currentBook:action.payload.book,currentText:action.payload.text,spellings:action.payload.spellings,AuthorBio:'',BookDescription:'',currentTitle:action.payload.title,turnPage:'',readerPosition:{start:0,end:0,text:''}});

	case  GET_CURRENT + FULFILLED:
			return Object.assign({},state,{currentText:action.payload.text,currentBook:action.payload.book,spellings:action.payload.spellings,currentTitle:action.payload.title,turnPage:'',readerPosition:{start:0,end:0,text:''}});
	
	case INC_BOOKSHELF:
		return Object.assign({},state,{bookShelf:state.bookShelf +1});

	case GET_NEXT_PAGE + FULFILLED:
			return Object.assign({},state,{currentText:action.payload.text,spellings:action.payload.spellings,turnPage:'',readerPosition:{start:0,end:0,text:''}});


        case GET_PREV_PAGE + FULFILLED:
			return Object.assign({},state,{currentText:action.payload.text,spellings:action.payload.spellings,turnPage:''});
	

	case SET_LIKE + FULFILLED:
			return Object.assign({},state,{currentText:'',currentBook:null});

	case GET_SUGGESTION_TEXT +FULFILLED:
              return Object.assign({},state,{currentText:action.payload.text,currentBook:action.payload.book});
	case LOGIN +FULFILLED:
			return state;
	
	case GET_USER + FULFILLED:
	   return Object.assign({},state,{user:action.payload});
	case GET_BOOKS + FULFILLED:
        return Object.assign({},state,{books:action.payload});
	case GET_SUGGESTIONS + FULFILLED:
	 return Object.assign({},state,{books:action.payload});
	case GET_BOOKS_BY_AUTHOR + FULFILLED:
	   return Object.assign({},state,{books:action.payload});
	case GET_BOOK_BY_ID + FULFILLED:
	   return Object.assign({},state,{books:action.payload});
	default:
	   return state;
	}
}













