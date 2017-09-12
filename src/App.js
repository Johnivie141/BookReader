import  { Component} from 'react';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import router from './router.js';

class App extends Component{
render(){

    return (
      <div className="App">
	    {router}
      </div>
    );
}
}

export default App;
