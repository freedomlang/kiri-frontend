import React, { Component } from "react";
import { marked } from "../../utils";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import "./style.scss";

export default class ArticleListItem extends Component {
  parseMarkdown = () => ({
    __html: this.props.articleSummary ? marked(this.props.articleSummary) : ""
  });

  parse2date = dateTime => dayjs(dateTime).format("YYYY年M月DD日");

  render() {
    const { articleTitle, modifiedTime, category, id } = this.props;
    return (
      <article className="article-list-item">
        <h2 className="article-title">
          <Link className="article-title-url" to={`/article/${id}`}>
            {articleTitle}
          </Link>
        </h2>
        <ul className="article-meta">
          <li className="article-meta-item">
            <Link
              className="inheritColor"
              to={`/category/${category}`}
            >
              {category}
            </Link>
          </li>
          <li className="article-meta-item">
            <time>{this.parse2date(modifiedTime)}</time>
          </li>
        </ul>
        <div
          className="article-summary"
          dangerouslySetInnerHTML={this.parseMarkdown()}
        ></div>
      </article>
    );
  }
}
