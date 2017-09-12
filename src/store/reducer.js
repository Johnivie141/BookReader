import React from 'react';
import Parser from 'html-react-parser';
import {apiChangeSpelling,apiGetAuthorBio,apiGetBookDescription,apiMerriamDictionary,apiGetCurrent,apiSetCurrent,apiGetNextPage,apiGetPrevPage,apiGetPage,apiSetLike,apiGetSuggestionText,apiGetBooks,apiGetBookById,apiGetBooksByAuthor,apiGetSuggestions,apiGetUser,apiLogin} from '../services/apiServices';


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
export function changeWord(bookid,oldWord,newWord,position){
	return {
		type: CHANGE_SPELLING,
		payload:apiChangeSpelling(bookid,oldWord,newWord,position)
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
	return {
		type:GET_PREV_PAGE,
		payload:apiGetPrevPage(bookid)
	}              
}

export function getNextPage(bookid){
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
export function getBooks(bookShelf){
	return {
		type:GET_BOOKS,
		payload:apiGetBooks(bookShelf)
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
	user:null,
	books:[],
    	bookShelf:0,
	currentText:'',
	currentBook:null,
        openModal:false,
	AuthorBio:'',
	BookDescription:'',
        modalObject:null
}



export default function reducer(state=initialState,action){
	switch(action.type)
	{
	case CHANGE_SPELLING + FULFILLED:
			return Object.assign({},state,{spellings:action.payload});

	case GET_AUTHOR_BIO + FULFILLED:
			return Object.assign({},state,{AuthorBio:action.payload});
	case GET_BOOK_DESCRIPTION + FULFILLED:
			return Object.assign({},state,{BookDescription:action.payload});


	case CLOSE_MODAL:
			return Object.assign({},state,{modalObject:null,openModal:false});

	case SET_MODAL:
			return Object.assign({},state,{openModal:true,modalObject:action.payload});
	case DICTIONARY_LOOKUP + FULFILLED:
	                console.log("Dictionary lookup fulfilled");
			let modalObject = (<div><h1>{action.payload.word}</h1><p>{Parser(action.payload.meaning)}</p></div>);

			return Object.assign({},state,{modalObject:modalObject,openModal:true});
	case SET_CURRENT_SQL + FULFILLED:
			return Object.assign({},state,{currentBook:action.payload.book,currentText:action.payload.text,AuthorBio:'',BookDescription:''});

	case  GET_CURRENT + FULFILLED:
			return Object.assign({},state,{currentText:action.payload.text,currentBook:action.payload.book});
	
	case INC_BOOKSHELF:
		return Object.assign({},state,{bookShelf:state.bookShelf +1});

	case GET_NEXT_PAGE + FULFILLED:
			return Object.assign({},state,{currentText:action.payload.text,spellings:action.payload.spellings});
        case GET_PREV_PAGE + FULFILLED:
			return Object.assign({},state,{currentText:action.payload.text,spellings:action.payload.spellings});
	

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













