import React, { Component } from "react";
import { converter } from "../../utils";
import dayjs from 'dayjs';
import {
  Link
} from 'react-router-dom';
import './style.scss'

export default class ArticleListItem extends Component {
  parseMarkdown = () => ({
    __html: this.props.articleSummary ? converter.makeHtml(this.props.articleSummary) : ''
  })

  parse2date = (dateTime) => dayjs(dateTime).format('YYYY年M月DD日');

  render() {
    const { articleTitle, modifiedTime, category, id } = this.props;
    return (
      <article
        className="article-list-item"
      >
        <h2 className="article-title" >
          <Link className="article-title-url" to={`/article/${id}`}>{articleTitle}</Link>
          {/* <a className="article-title-url" href="https://blog.freedomlang.com/1398.html">{articleTitle}</a> */}
        </h2>
        <ul className="article-meta">
          <li className="article-meta-item">
            <a className="inheritColor" href="https://blog.freedomlang.com/category/Linux/">{category}</a>
          </li>
          <li className="article-meta-item">
            <time >
              { this.parse2date(modifiedTime) }
            </time>
          </li>
        </ul>
        <div className="article-summary" dangerouslySetInnerHTML={this.parseMarkdown()}></div>
      </article>
    );
  }
}
