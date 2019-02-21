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
    $http.get(`article/${this.props.match.params.id}`).then(data => {
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
    const { title = " " } = this.state.article;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-2" />
          <section className="col-xl-7">
            <Skeleton loading={this.state.loading} paragraph={{ rows: 4 }}>
              <article
                className="article-detail"
                itemscope=""
                itemtype="http://schema.org/BlogPosting"
              >
                <h1 className="article-title" itemprop="name headline">
                  {title}
                </h1>
                <ul className="article-meta">
                  <li className="article-meta-item">
                    <time
                      datetime="2019-01-15T22:36:25+00:00"
                      itemprop="datePublished"
                    >
                      January 15, 2019
                    </time>
                  </li>
                  <li className="article-meta-item">
                    分类:{" "}
                    <a
                      className="inheritColor"
                      href="https://blog.freedomlang.com/category/Linux/"
                    >
                      Linux
                    </a>
                  </li>
                  <li className="article-meta-item">
                    <a className="article-meta-item-tag" href="https://blog.freedomlang.com/tag/VPS/">VPS</a>
                  </li>
                </ul>
                <div
                  className="article-content"
                  itemprop="articleBody"
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
