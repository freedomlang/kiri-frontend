// @flow

import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import logo from 'images/logo.svg';
import './style.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false
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
  }

  render() {
    const className4searcPanel = this.state.showSearch ? 'search active' : 'search';
    // const logo = require('imgs/Header/blueLogo.png');
    // const headerText = this.props.location.pathname === '/login' ? '后台管理页面' : (sessionStorage.getItem('username') || '后台管理页面');
    // const class4username = 'col-md-4 text-right' + (this.props.location.pathname !== '/login' ? ' username' : '');

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
                <a href="#/" onClick={this.toggleSearchPanel} className="nav-item">
                  <i className="fa fa-search"></i>
                </a>
              </nav>
            </div>
            <div className="col-xl-3"></div>  
          </div>
        </div>
        <div className={className4searcPanel}>
              <div className="table-center">
                <p className="placeholder4search">按回车键搜索</p>
                <input type="text" id="search" autoFocus={true} ref={el => (this._input = el)} />
              </div>
            <label className="closePanel" onClick={this.toggleSearchPanel}></label>
          </div>
      </header>
    );
  }
}

export default Header;