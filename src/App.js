import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BookApp from "./BookApp";
import SearchPage from "./SearchPage";

function App() {
  return (
    <div className="app">
      <Router>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <Switch>
            <Route exact path="/" component={BookApp} />
            <Route path="/search" component={SearchPage} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
