import React, { PureComponent } from 'react'
import './style.scss'

export default class NotFoundPage extends PureComponent {
  render() {
    return (
      <div className="notFound">
        <div className="glitch" data-text="404">404</div>
      </div>
    );
  }
}