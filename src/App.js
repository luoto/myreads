import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import Search from './components/Search';
import BookShelf from './components/BookShelf';

class BooksApp extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/" component={BookShelf} />
            <Route path="/search" component={Search} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default BooksApp;
