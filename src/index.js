import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import store from './store/store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


ReactDOM.render(
	<BrowserRouter>
	<Provider store={ store} >
	<App />
	</Provider>
	</BrowserRouter>
	, document.getElementById("root")
);

