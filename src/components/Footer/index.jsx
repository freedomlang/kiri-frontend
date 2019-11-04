import React, { Component } from "react";
import './style.scss';

export default class Footer extends Component {
  render() {
    const currentYear = (new Date()).getFullYear();
    // return ReactDOM.createPortal(
    //     (
    //         <footer id="footer" role="contentinfo">
    //           Copyright © 2015-{currentYear} freedomlang
    //         </footer>
    //       ),
    //     document.getElementById('root')
    //   );
    return (
        <footer id="footer" role="contentinfo">
            © Blackie's Blog 2015 - {currentYear}<br/>
            Designed and developed by Blackie Wu
        </footer>
    )
  }
}
