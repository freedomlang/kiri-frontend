import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />

          <Route exact path="/" component={ArticleList} />
          <Route exact path="/article/:id" component={ArticleDetail} />

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
