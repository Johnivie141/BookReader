const env=require('dotenv').config({
	path:'/home/ec2-user/security/booktips/booktips.auth'})
      , express = require('express')
      , cors = require('cors')
      , bodyParser = require('body-parser')
      , passport = require('passport')
      , Auth0Strategy = require('passport-auth0')
      , massive = require('massive')
      , session = require('express-session')
      , postgres_config = require('/home/ec2-user/security/booktips/postgres_config')
      , server_config = require('/home/ec2-user/security/booktips/server_config')
      , port=3030
      , app=express()
      , bookCTRL = require('./controllers/book_controller');

massive({
	host:postgres_config.host,
	port:postgres_config.port,
	user:postgres_config.user,
	database:postgres_config.database,
	password:postgres_config.password})
        .then(db=>{app.set('db',db);
	});

app.use(bodyParser.json());
const whitelist=['http://localhost:3000','http://18.220.207.69:3000'];

var corsOptions={
origin: function (origin,callback){
	if (origin==="http://18.220.207.69:3000"){
		callback(null,true);
	}
	else{
		callback(new  Error("Not Allowed by CORS"));
	   }
        },
	credentials:true


};

        app.use(cors());











app.use(session({
	secret: server_config.secret,
	resave:false,
	saveUninitialized:false

}));
app.use(express.static(__dirname + '/..build'));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
	domain:process.env.AUTH_DOMAIN,
	clientID:process.env.AUTH_CLIENT_ID,
	clientSecret: process.env.AUTH_CLIENT_SECRET,
	callbackURL: process.env.AUTH_CALLBACK
}, function(accessToken,refreshToken,extraParams,profile,done){
	const db = app.get('db');
	db.find_user([profile.identities[0].user_id])
	.then(user=>{
		if (user[0]){
			return done(null,{id:user[0].id});
		}
		else {
			let email= (profile && profile.emails)?profile.emails[0].value: '';
			db.create_user([profile.displayName,email,profile.picture,profile.identities[0].user_id])
			 .then(user=>{return done(null,{id:user[0].id})});
		}
	})
	.catch(err=>console.log(err));
}));


app.get('/auth/callback',passport.authenticate('auth0',{
	successRedirect:'http://18.220.207.69:3000/suggestions',
	failureRedirect:'http://www.bing.com'
})
);

passport.serializeUser(function(user,done){
	done(null,user);
});

passport.deserializeUser(function(obj,done){
	app.get('db').find_session_user([obj.id])
	.then(user=>{
		return done(null,user[0]);
	})
});

app.get('/auth/me',cors(corsOptions),(req,res,next)=>{
	if (!req.user){
		
		res.status(404).send('User not found');
	}
	else {

		res.status(200).send(req.user);
	}
});

app.get('/auth/logout',(req,res)=>{
	req.logOut();
	 res.redirect(302,'http://localhost:3000/#/');
});

app.get('/auth',(req,res,next)=>{
	next();
},passport.authenticate('auth0'));

// api functions
//
app.get('/api/booklist/',cors(corsOptions),bookCTRL.getBooks);

app.get('/api/book/:bookid',bookCTRL.get_book_byid);
app.get('/api/author/:authorname/books',bookCTRL.get_book_byauthor);
app.get('/api/suggestions',cors(corsOptions),bookCTRL.get_suggestions);
app.get('/api/suggestiontext',cors(corsOptions),bookCTRL.get_suggestiontext);
app.get('/api/current',cors(corsOptions),bookCTRL.getCurrent);
app.get('/api/book/:bookid/nextpage',cors(corsOptions),bookCTRL.get_next_page);
app.get('/api/book/:bookid/prevPage',cors(corsOptions),bookCTRL.get_prev_page);
app.get('/api/setlike',cors(corsOptions),bookCTRL.setLike);
app.get('/api/book/:bookid/setcurrent',cors(corsOptions),bookCTRL.setCurrent);
app.get('/api/word',cors(corsOptions),bookCTRL.dictionaryLookup);
app.get('/api/book/:bookid/description',cors(corsOptions),bookCTRL.getBookDescription);
app.get('/api/book/:bookid/authorbio',cors(corsOptions),bookCTRL.getAuthorBio);
app.post('/api/book/:bookid/spelling',cors(corsOptions),bookCTRL.changeSpelling);

app.listen(port,()=>{console.log(`Listening on port ${port}`);});
