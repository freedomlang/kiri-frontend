// @flow

import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchPanel from "../SearchPanel";
// import groupBy from "lodash.groupby";
import { $http } from "../../utils";
import logo from "images/logo.svg";
import "./style.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false,
      notFound: false,
      searchText: "",
      matchedArticles: []
    };
  }

  _input: ?HTMLInputElement;

  toggleSearchPanel = () => {
    this.setState({
      showSearch: !this.state.showSearch
    });

    window.setTimeout(
      () =>
        this.setState({
          matchedArticles: [],
          searchText: ""
        }),
      310
    );
  };

  handelInput = event => {
    return this.setState({
      searchText: event.target.value
    });
  };

  searchArticles = event => {
    event.preventDefault();
    const { searchText } = this.state;
    this.setState({ notFound: false });
    return $http.get("articles", {
      params: {
        pageNum: 1,
        pageSize: 10,
        text: searchText
      }
    })
    .then(response => {
      const { data: matchedArticles } = response;
      this.setState({
        notFound: matchedArticles.length === 0,
        matchedArticles
      });
    });
  };

  handleHotKey = event => {
    if (event.keyCode === 27 && this.state.showSearch) {
      this.toggleSearchPanel();
    }
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleHotKey);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleHotKey);
  }

  render() {
    return (
      <header>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-xl-2 text-left">
              <Link to="/">
                <img alt="logo" src={logo} className="logo" />
              </Link>
            </div>
            <div className="col-xl-7">
              <nav>
                <Link
                  to="/"
                  className="nav-item"
                  style={{ textDecoration: "line-through" }}
                >
                  留言板
                </Link>
                <Link to="/about" className="nav-item">
                  关于
                </Link>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid, no-script-url */}
                <button
                  type="button"
                  onClick={this.toggleSearchPanel}
                  className="btn-transparent nav-item"
                >
                  <i className="fa fa-search"></i>
                </button>
              </nav>
            </div>
          </div>
        </div>
        <SearchPanel
          toggleSearchPanel={this.toggleSearchPanel}
          visible={this.state.showSearch}
        />
      </header>
    );
  }
}

export default Header;
