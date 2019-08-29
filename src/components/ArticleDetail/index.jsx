import React, { Component } from "react";
import { Skeleton } from "antd";
import { $http, converter } from "../../utils";
import "./style.scss";

export default class ArticleDetail extends Component {
  state = {
    loading: true,
    article: {}
  };

  componentDidMount = () => {
    this.getArticleDetail();
  };

  parseMarkdown = () => ({
    __html: this.state.article.text
      ? converter.makeHtml(this.state.article.text)
      : ""
  });

  getArticleDetail = () => {
    $http.get(`articles/${this.props.match.params.id}`).then(data => {
      if (data) {
        this.setState({
          article: data
        });

        setTimeout(() => {
          this.setState({
            loading: false
          });
        }, 600);
      }
    });
  };

  render() {
    const { title = "", modified, tags = [], category } = this.state.article;
    const el4tags = tags.map((tag, index) => (
      <li className="article-meta-item" key={index}>
        <a className="article-meta-item-tag" href="https://blog.freedomlang.com/tag/VPS/">{tag}</a>
      </li>
    ))
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-2" />
          <section className="col-xl-8">
            <Skeleton active={true} loading={this.state.loading} paragraph={{ rows: 6 }}>
              <article
                className="article-detail"
              >
                <h1 className="article-title" >
                  {title}
                </h1>
                <ul className="article-meta">
                  <li className="article-meta-item">
                    <time>{modified}</time>
                  </li>
                  {category ? <li className="article-meta-item">
                    分类:{" "}
                    <a
                      className="inheritColor"
                      href="https://blog.freedomlang.com/category/Linux/"
                    >{category}</a>
                  </li> : null}
                  {el4tags}
                </ul>
                <div
                  className="article-content"
                  dangerouslySetInnerHTML={this.parseMarkdown()}
                />
              </article>
            </Skeleton>
          </section>
        </div>
      </div>
    );
  }
}
