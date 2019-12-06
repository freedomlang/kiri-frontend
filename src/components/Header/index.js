// @flow

import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import groupBy from 'lodash.groupby';
import { $http } from '../../utils';
import logo from 'images/logo.svg';
import './style.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false,
      searchText: '',
      matchedArticles: []
    };
  }

  _input: ?HTMLInputElement

  toggleSearchPanel= () => {
    this.setState({
      showSearch: !this.state.showSearch
    }, () => {
      if (this.state.showSearch) {
        this._input.focus();
      }
    });

    window.setTimeout(() => this.setState({
      matchedArticles: [],
      searchText: ''
    }), 310);
  }

  handelInput = (event) => {
    return this.setState({
      searchText: event.target.value
    });
  }

  searchArticles = (event) => {
    event.preventDefault();;
    const { searchText } = this.state;
    return $http.get('articles', {
      params:{
        pageNum: 1,
        pageSize: 10,
        text: searchText
      }
    }).then(response => {
      const { data } = response;
      this.setState({
        matchedArticles: data.map(function (perData){
          // perData.articleLink = '//' + hostName + '/#/article/' + perData._id;

          return perData;
        })
      });

      console.log(groupBy(data, 'category'))
    });
  }

  render() {
    const className4searcPanel = this.state.showSearch ? 'search active' : 'search';
    const { searchText } = this.state;

    return (
      <header>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-xl-2 text-left">
              <Link to="/">
                <img alt="logo" src={logo} className="logo"/>
              </Link>
            </div>
            <div className="col-xl-7">
              <nav>
                <Link to="/" className="nav-item" style={{textDecoration: 'line-through'}}>留言板</Link>
                <Link to="/about" className="nav-item" >关于</Link>
                <a href="javascript:;" onClick={this.toggleSearchPanel} className="nav-item">
                  <i className="fa fa-search"></i>
                </a>
              </nav>
            </div>
            <div className="col-xl-3"></div>
          </div>
        </div>
        <div className={className4searcPanel}>
            <form className="table-center" onSubmit={this.searchArticles}>
              <input type="text" id="search"
                autoFocus={true}
                ref={el => (this._input = el)}
                placeholder="搜索"
                value={searchText}
                onChange={(event) => this.handelInput(event) }
                />
            </form>
            <ul className="list-inline matchResults">{
              this.state.matchedArticles.map(({_id, title, modified}) => (
                <li className="matchedArticle list-inline-item" key={_id}>
                  <time className="color-gray font-14">{modified}</time>
                  <p className="text-truncate">
                    <Link to={`/article/${_id}`} onClick={this.toggleSearchPanel} >{title}</Link>
                  </p>
                </li>
              ))
            }</ul>
          <label className="closePanel" onClick={this.toggleSearchPanel}></label>
        </div>
      </header>
    );
  }
}

export default Header;