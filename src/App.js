import  { Component} from 'react';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import router from './router.js';
import Nav from './components/Nav/Nav';

class App extends Component{
render(){

    return (
      <div className="App">
	    <Nav/>
	    {router}
      </div>
    );
}
}

export default App;
