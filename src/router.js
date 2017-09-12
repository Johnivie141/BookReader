import {Switch,Route} from 'react-router-dom';
import React from 'react';
import Main from './components/Main/Main';
import Suggestions from './components/Suggestions/Suggestions';
import Read from './components/Read/Read';
import Library from './components/Library/Library';
import About from './components/About/About';

export default (
	<Switch>
	<Route  path="/home" component={Main} />
	<Route path="/suggestions" component={Suggestions} />
        <Route path="/read" component={Read} />
	<Route path="/library" component={Library} />
	<Route path="/about" component={About} />
	</Switch>
);

