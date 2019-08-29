import React, { Component } from 'react'
import ArticleListItem from '../ArticleListItem'
import { $http } from '../../utils'

export default class ArticleList extends Component {
  state = {
    articles: []
  }

  componentWillMount = () => {
    this.getArticles();
  }

  getArticles = () => {
    $http.get('articles', {
      params: {
        pageNum: 1,
        pageSize: 10
      }
    }).then((response) => {
      this.setState({
        articles: response.data.map(({ title: articleTitle, text: articleSummary, _id: key, modified: modifiedTime, category }) => ({
          id: key,
          key,
          modifiedTime,
          articleTitle,
          articleSummary,
          category
        }))
      })
    })
  }
  
  render() {
    const { articles } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-2"></div>
          <section className="col-xl-8">
            {articles.map((perArticle) => <ArticleListItem {...perArticle} />)}
          </section>
          <div className="col-xl-2"></div>  
        </div>
      </div>
    )
  }
}
