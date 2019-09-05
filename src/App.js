import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import NotFoundPage from './pages/404'
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />

          <Switch>
            <Route exact path="/" component={ArticleList} />
            <Route exact path="/article/:id" component={ArticleDetail} />
            <Route exact path="/404" component={NotFoundPage} />
            <Redirect to="/404" />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
