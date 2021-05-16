import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import BookApp from './BookApp';
import SearchPage from './SearchPage';

function App() {
  return (
    <div className='App'>
      <Router>
        <Route exact path='/' component={BookApp}/>
        <Route path='/search' component={SearchPage} />
      </Router>
    </div>
  );
}

export default App;
