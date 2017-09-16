import axios from 'axios';
//import LZString from 'lz-string';
const localApiUrl='http://www.booktips.pro:3000';

const api = axios.create({
	withCredentials:true
});

export function apiGetSettings(){
	return api.get(localApiUrl + '/api/settings').
		then(response=>{
			console.log(response.data);
			return response.data;
		});
}
export function apiSetSettings(settings){
 console.log("STORING SETTINGS");
console.log(settings);
	return axios.post(localApiUrl + '/api/settings',{settings:settings})
	. then(response=>{
		return response.data;
	});
}


export function apiGetAuthorBio(bookid){
	return api.get(localApiUrl +'/api/book/' + bookid + '/authorbio')
		.then(response=>{
                        return response.data;
		})
		.catch(err=>{console.log("ERROR");console.log(err)});
}


export function apiGetBookDescription(bookid){
	return api.get(localApiUrl +'/api/book/' + bookid + '/description')
		.then(response=>{
                        return response.data;
		})
		.catch(err=>console.log(err));
}





export function apiMerriamDictionary(word){
return api.get(localApiUrl + '/api/word/?word=' + word)
	.then(response=>{
		return response.data;
	})
	.catch(err=>console.log(err))


}




export function apiSetCurrent(bookid){
	return api.get(localApiUrl + '/api/book/' +bookid + '/setcurrent')
	          .then(response=>{
			  console.log("API set current");
			  console.log(response.data);
		       return response.data;
		  })
	          .catch(err=>console.log(err));
}


export function apiGetCurrent(){
	return api.get(localApiUrl + '/api/current')
	          .then(response=>{
			  console.log("apiGetCurrent ");
			  console.log(response);
			  return response.data;})
                .catch(err=>{console.log(err);})

}


export function apiDownload(bookid){
	
	return api.get(localApiUrl + '/api/book/' + bookid + '/download')
	.then (response=>{
		console.log(response);
		//localStorage.setItem('book' + bookid,LZString.compressToUTF16(response.data.text));
		//localStorage.setItem('book_spellings' +bookid , LZString.compressToUTF16(JSON.stringify(response.data.spellings)));
		return bookid;
	})
}

export function apiSetLike(bookid,like){
	return api.get(localApiUrl + '/api/setlike?bookid=' + bookid + '&likes=' + like)
	          .then(response=>{
			  return response.data;
		  })
		.catch(err=>{console.log(err); return ''});
}
export function apiGetBooks(bookShelf,filter,filterChange){
	if (filterChange){
		filter = Object.assign({},filter,filterChange);
	}
	console.log("filter");
	console.log(filter);
	switch(filter.library){
	case 'mine':
			console.log("my books filter " + filter);
          return api.get(localApiUrl + '/api/mybooklist?shelf=' + bookShelf + '&searchTerm=' + filter.searchterm).then(books=>{return books.data}); 
	  default:
			console.log("all books");
	   return api.get(localApiUrl + '/api/booklist?shelf=' + bookShelf + '&searchTerm=' + filter.searchterm)
	     .then(books=>{return books.data});
        }
}

export function apiLogin(){
	           return axios.get(localApiUrl + "/auth")
		     .then(response=>{
			    return response;
		    })
	            .catch(err=>{
			    console.log(err);
		    })
}

export function apiGetUser(){
	// debug try this
	//end debug try this
	return  api.get(localApiUrl  + '/auth/me')
	            .then(response =>{
		     return response;
		    })
	            .catch(err=>{
			    console.log(err)});

}


export function apiGetBookById(id){
	return api.get(localApiUrl + '/api/book/' +id)
	.then (books=>{return books});
}

export function apiGetNextPage(id){

   return api.get(localApiUrl + '/api/book/' + id + '/nextpage')
	.then(response =>{return response.data;});
}
export function apiGetPrevPage(id){
   return api.get(localApiUrl + '/api/book/' + id + '/prevpage')
	.then(response =>{return response.data;});
}





export function apiChangeSpelling(bookid,oldWord,newWord,position,spellings){
	return new Promise(function(resolve,reject){

	
	   api.get(localApiUrl + '/api/book/' + bookid + '/spelling?oldword=' + oldWord + "&newword=" + newWord + "&position=" + position); 

	spellings = spellings.filter(spelling=>{return spelling.position != position});

	spellings.push({
	position:position,
	oldword:oldWord,
	newword:newWord});
	console.log("debug inside api spellings");
	console.log(spellings);

	 resolve(spellings);
	})
}





export function apiGetSuggestionText(){
    return api.get(localApiUrl + '/api/suggestiontext')
	    .then(text=>{return text.data;});
}
export function apiGetSuggestions(){
	return api.get(localApiUrl + '/api/suggestions')
	   .then (books=>{return books.data});
}

export function apiGetBooksByAuthor(author){
	return axios.get(localApiUrl + '/api/author/:' + author + '/books')
	.then (books=>{return books});
}

