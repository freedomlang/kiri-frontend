import React, { Component } from "react";
import ArticleListItem from "../ArticleListItem";
import { $http } from "../../utils";

export default class ArticleList extends Component {
  state = {
    articles: []
  };

  componentWillMount = () => {
    this.getArticles();
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.path !== this.props.match.path ||
      (this.props.match.params.category && this.props.match.params.category !== prevProps.match.params.category) ||
      (this.props.match.params.tag && this.props.match.params.tag !== prevProps.match.params.tag)
    ) return this.getArticles().then(() => {
      if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0)
      }
    });
  }

  getArticles = () => {
    return $http.get("articles", {
      params: {
        pageNum: 1,
        pageSize: 10,
        ...this.props.match.params
      }
    })
    .then(response => {
      const articles = response.data.map(
        ({
          title: articleTitle,
          text: articleSummary,
          _id: key,
          modified: modifiedTime,
          category
        }) => ({
          id: key,
          key,
          modifiedTime,
          articleTitle,
          articleSummary,
          category
        })
      );
      this.setState({
        articles
      });
    });
  };

  render() {
    const { articles } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-2"></div>
          <section className="col-xl-8">
            {articles.map(perArticle => (
              <ArticleListItem {...perArticle} />
            ))}
          </section>
        </div>
      </div>
    );
  }
}
