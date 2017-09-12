let fs = require('fs');
const axios = require('axios');;

const merriam = require('/home/ec2-user/security/booktips/merriam_config.js');



function formatPage(text){
        text=text.replace(/\r\n?(\r\n?)+/g,"\r<br \/>");
return text;
}

let chunkSize=1500;


function getCurrentPage(req,userid,bookid){
   let data ='';
    return new Promise(
        function (resolve, reject) {

            req.app.get("db").get_bookpos([userid,bookid])
           .then(result=>{
                 let currentpos=0;
                 if (result && result[0]) currentpos = +result[0]["pos"];
                 let readerStream =fs.createReadStream('./books/' + bookid + '.final', { start: currentpos, end: currentpos +chunkSize });

                 readerStream.on('data',chunk=>{data +=chunk;});
                    readerStream.on('end',function(){
                   // remove up to first space
                        let strippeddata = data.replace(/ [^ ]*$/,"");

                                     let dataTmp = strippeddata; 
                                     let wordcount=0; 
                                     let wordMarker=0; 
                                     dataTmp.replace(/((?:\b\w+)|(?:<wc\d+>))/g,function(match,match1){ 
   
                                        if (match1.indexOf("<wc")==-1) wordcount++; 
                                        else{ 
                                                match1=match1.replace(/[^\d]+/g,""); 
                                                wordMarker=Number(match1); 
                                        } 
                                     }) 
                                             let spellingStart = wordMarker - wordcount; 
                                             if (spellingStart <0) spellingStart =0; 
                                             let spellingEnd = wordMarker + wordcount; 
                                     req.app.get("db").get_spellings([userid, bookid,spellingStart,spellingEnd]) 
                                        .then(spellings=>{ 
                                              req.app.get("db").set_bookpos([userid,+req.bookid,startpos+ +pageStart ]).then((result)=>{
						      resolve({text:strippeddata,spellings:spellings})}) 
                                    }) 
 







                })

    });
}
    )
}

function getNextPage(req,userid,bookid){
   let data ='';
    return new Promise(
	function (resolve, reject) {	
           getCurrentPage(req,userid,bookid)
		.then(pageDataObject=>{
			let pageData = pageDataObject.text;
	             req.app.get("db").get_bookpos([userid,bookid])
	             .then(result=>{
	                   let currentpos=0;
		            if (result && result[0]) currentpos = +result[0]["pos"];
			    currentpos +=pageData.length+1;
		            let readerStream =fs.createReadStream('./books/' + bookid + '.final', { start: currentpos, end: currentpos +chunkSize });
	         readerStream.on('data',chunk=>{data +=chunk;});
		    readerStream.on('end',function(){
		   // remove up to first space
                   let strippeddata = data.replace(/ [^ ]*$/,"");
	                   req.app.get("db").set_bookpos([userid,bookid,currentpos])
			    .then(posresponse=>{


                                     let dataTmp = strippeddata;
                                     let wordcount=0;
                                     let wordMarker=0;
                                     dataTmp.replace(/((?:\b\w+)|(?:<wc\d+>))/g,function(match,match1){

                                        if (match1.indexOf("<wc")==-1) wordcount++;
                                        else{
                                                match1=match1.replace(/[^\d]+/g,"");
                                                wordMarker=Number(match1);
                                        }
                                     })
                                             let spellingStart = wordMarker - wordcount;
                                             if (spellingStart <0) spellingStart =0;
                                             let spellingEnd = wordMarker + wordcount;



                                          req.app.get("db").get_spellings([userid, bookid,spellingStart,spellingEnd])
                                                .then(spellings=>{
							resolve({text:strippeddata,spellings:spellings});


                                            })



				})
		}).catch(err=>{reject(err)})
	
            });
	});
	})
}

const api = axios.create({
        withCredentials:true
});

module.exports ={

	changeSpelling:(req,res)=>{
		let bookid= +req.params.bookid;
		let userid = +req.user.id;
		let {oldWord,newWord,position} = req.body;
		req.app.get("db").set_spelling([userid,bookid,oldWord,newWord,position])
		.then(result=>{res.status(200).send(result)});
	},


	getBookDescription:(req,res)=>{
let bookid = +req.params.bookid;
 req.app.get("db").get_book([bookid])
                        .then(result=>{
				let book = result[0];

				let title =book.title;
                                title=title.replace(/[^A-Za-z]/g," ");
                                title=title.replace(/  +/g," ");
				let descUrl="http://en.wikipedia.org/w/api.php?format=xml&action=query&prop=extracts&exintro=&explaintext=1&titles=" + title;


				api.get(descUrl)
				.then(description=>{

					let extracts = description.data.match(/<extract[^>]*>((?:(?!<\/extract>)[\s\S])*)<\/extract>/);

					if (extracts){

					extracts=extracts.slice(1,2);
					 let extract = extracts[0];
					extract=extract.replace(/^([^\r\n]+)[\r\n][\s\S]+$/,"$1");

					res.status(200).send(extract);
					} 
					else res.status(200).send("No description");
				})
				.catch(err=>console.log(err));
			})
                        .catch(err=>{console.log(err);res.status(500).end()})


},
	getAuthorBio:(req,res)=>{
let bookid = +req.params.bookid;
 req.app.get("db").get_book([bookid])
                        .then(result=>{
				let book = result[0];

				let author =book.author;
				author=author.replace(/^([^,]*),(.*)$/,"$2 $1");

				let authorUrl="http://en.wikipedia.org/w/api.php?format=xml&action=query&prop=extracts&exintro=&explaintext=1&titles=" + author;


				api.get(authorUrl)
				.then(description=>{

					let extracts = description.data.match(/<extract[^>]*>((?:(?!<\/extract>)[\s\S])*)<\/extract>/);

					if (extracts){
					extracts=extracts.slice(1,2);
					let extract = extracts[0];
					extract=extract.replace(/^([^\r\n]+)[\r\n][\s\S]+$/,"$1");
					
					res.status(200).send(extract);
					}
					else{
						res.status(200).send("Unknown author");
					}
					})
				.catch(err=>console.log(err));
			})
                        .catch(err=>{console.log(err);res.status(500).end()})


},








  dictionaryLookup:(req,res)=>
	{

		let word = req.query.word;
  return  axios.get("http://www.dictionaryapi.com/api/v1/references/collegiate/xml/" + word + "?key=" + merriam.key)
         .then(response=>{

		 let  definitionsArray=response.data.match(/<dt>(?:(?:(?!<\/dt>).)*)<\/dt>/g);
		 if (definitionsArray){
		   definitionsArray=definitionsArray.slice(0,3);
                   let meaning=definitionsArray.map(def=>{
                   def=def.replace(/<\/?dt>/g,"");
		   def=def.replace(/^:/,"");
		   def=def.replace(/<[^<>]*>/g,"");
		   return def; 
                     }).join("<br \/>");
                   res.status(200).json({
                           meaning:meaning,
                           word:word
                   });
	          }
		 else{
			 res.status(200).json({meaning:'Unknown',word:word});
		 }
   
        
		 
           })
        .catch(err=>{console.log(err);res.status(500).end()})



	},
	
	setLike:(req,res)=>{
		if (!req.user) return res.status(404).send('User not found');
		else{
                    let likeValue= +req.query.likes;
		    let bookid= +req.query.bookid;
		    let userid= +req.user.id;
		    req.app.get("db").set_likes([userid,bookid,likeValue])
			.then(result=>res.status(200).send("ok"));

		}
	},
	setCurrent:(req,res)=>{
		if (!req.user)  res.status(404).send('User not found');
		else {
                    let bookid = +req.params.bookid;
	            let userid = +req.user.id;
		    req.app.get("db").set_current_book([userid,bookid])
			   .then(result=>{
				   getCurrentPage(req,userid,bookid)
				   .then(textresponse=>{
                                             res.status(200).json({book:bookid,text:textresponse.text,spellings:textresponse.spellings});
				   })
			   })
		           .catch(err=>{console.log(err); res.status(500).end();
			   })
		     }
	},
	



	getCurrent:(req,res)=>{
		if (!req.user) res.status(404).send('User not found');
		else{
                     let userid = +req.user.id;
		     return req.app.get("db").get_current_book([userid])
			    .then(result=>{
				    let bookid = result[0].currentbook;
				    getCurrentPage(req,userid,bookid)
				    .then(response=>{
					   res.status(200).json({book:bookid,text:response.text,spellings:response.spellings});
				    })
                                 })
			.catch(err=>{console.log(err);res.status(500).end();})
		}

        },
	getBooks:(req,res)=>{
		if (!req.user) return res.status(404).send('User not found');
		else {
			let shelf=0;
			if (req.query && req.query.shelf){
				shelf=+req.query.shelf;
			}
			req.app.get("db").get_books([20,shelf*20])
			.then(result=>{res.status(200).send(result)})
		        .catch(err=>res.status(500).end());
		}
	},

	get_book_byid:(req,res)=>{
		if (!req.user) return res.status(404).send('User not found');
		else {
                      
			req.app.get("db").get_book([+req.params.bookid])
			.then(result=>{res.status(200).send(result)})
			.catch(err=>{console.log(err);res.status(500).end()})
		}
	},
	get_book_byauthor:(req,res)=>{
		if (!req.user) return res.status(404).send('User not found');
		else {
                      
			req.app.get("db").get_books_byauthor([ "%"  + req.params.authorname + "%"])
			.then(result=>{res.status(200).send(result)})
			.catch(err=>{console.log(err);res.status(500).end()})
		}
	},

	get_suggestiontext:(req,res)=>{
		if (!req.user)  res.status(404).send('User not found').end();
		else{
                        let data=""; 
                        req.app.get("db").get_suggestion([req.user.id]) 
                        .then(result=>{ 
                        let chunkSize=500;
				let bookid=result[0].id;
                        let currentpos=Math.floor(Math.random()*(result[0].size - chunkSize));




			let readerStream =fs.createReadStream('./books/' + bookid + '.final', { start: currentpos, end: currentpos +chunkSize }); 
                        readerStream.on('data',function(chunk){ 
                                data +=chunk; 
                        }); 


                        readerStream.on('end',function(){ 
                                // remove up to first space
                                 let strippeddata = data.replace(/ [^ ]*$/,""); 
                                 strippeddata=strippeddata.replace(/^[^ ]* /,"");


                                res.status(200).send({text:formatPage(strippeddata),book:bookid}); 
                                }) 
			})
			.catch(err=>{console.log(err);res.status(500).end()}) 
		}
	},


	get_suggestions:(req,res)=>{
		if (!req.user) return res.status(404).send('User not found');
		else {
                      let offset=0;
			if (req.query.offset){
				offset=+req.query.offset;
			}

			req.app.get("db").get_suggestions([req.user.id,1])
			.then(result=>{
				res.status(200).send(result)})
			.catch(err=>{console.log(err);res.status(500).end()})
		}
	},
	get_prev_page: (req,res) =>{
		let data='';
		if (!req.user) res.status(404).send('User not found');
		else{
                   req.app.get("db").get_bookpos([+req.user.id, +req.params.bookid])
			.then(result=>{
			  let currentpos=0;
	                  if (result && result[0]) currentpos = result[0]["pos"];

                           let readerStream = null;
			   let endpos=currentpos -1;
                          
				let startpos = currentpos - chunkSize;
			
				if (startpos <0){
                                   startpos=0;
				   endpos=chunkSize;

				}
				else endpos = currentpos -1;
				// Now we have correct end and startpos 
				// Now Gather Buffer
				let bookpath = './books/' + req.params.bookid + '.final';
                                 readerStream =fs.createReadStream(bookpath, { start: startpos, end: endpos });
                                readerStream.on('data',(chunk)=>{data +=chunk});
                                  
                                readerStream.on('end',function(){
                    

				    for (let pos=data.length -chunkSize;pos <data.length;pos++)
				       if (data[pos]===' ' && data[pos+1] !==' '){
				           pageStart=pos;
				           break;
				        }
				     dataResult = data.substr(pageStart);
				     dataResult = dataResult.replace(/ [^ ]*$/,"");
				     let dataTmp = dataResult;
			             let wordcount=0;
				     let wordMarker=0;
				     dataTmp.replace(/((?:\b\w+)|(?:<wc\d+>))/g,function(match,match1){
  
                                        if (match1.indexOf("<wc")==-1) wordcount++;
					else{
						match1=match1.replace(/[^\d]+/g,"");
						wordMarker=Number(match1);
					}
				     })
					     let spellingStart = wordMarker - wordcount;
					     if (spellingStart <0) spellingStart =0;
					     let spellingEnd = wordMarker + wordcount;
                                     req.app.get("db").get_spellings([+req.user.id, +req.params.bookid,spellingStart,spellingEnd])
					.then(spellings=>{
                                              req.app.get("db").set_bookpos([req.user.id,+req.params.bookid,startpos+ +pageStart ]).then((result)=>{res.status(200).send({text:dataResult,spellings:spellings})})
                                    })


				});





			})
		    }

		},

	get_next_page:(req,res)=>{
           if (!req.user) res.status(404).send('User not found');
	   else{
              let userid = +req.user.id;
	      let bookid = + req.params.bookid;
              getNextPage(req,userid,bookid)
		   .then(result=>res.status(200).send(result));



           }



       
           


	}





}

