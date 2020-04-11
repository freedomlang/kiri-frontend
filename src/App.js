import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import NotFoundPage from './pages/404'
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import './App.css';

const ArticleList = React.lazy(() => import('./components/ArticleList'));
const ArticleDetail = React.lazy(() => import('./components/ArticleDetail'));
const About = React.lazy(() => import('./pages/About'));

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />

          <ParticleBackground />
          <React.Suspense fallback={<span></span>}>
            <Switch>
              <Route exact path="/" component={ArticleList} />
              <Route exact path="/category/:category" component={ArticleList} />
              <Route exact path="/article/:id" component={ArticleDetail} />
              <Route exact path="/about" component={About} />
              <Route exact path="/404" component={NotFoundPage} />
              <Redirect to="/404" />
            </Switch>
          </React.Suspense>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
