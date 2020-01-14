import React, { useRef, useState, useEffect } from "react";
import {
  Link
} from 'react-router-dom';
import { $http, noop } from '../../utils';


function SearchPanel ({ toggleSearchPanel = noop, visible }) {
    const [searchText, setSearchText] = useState('');
    const [notFound, setNotFound] = useState(false);
    const [matchedArticles, setMatchedArticles] = useState([]);
    const inputRef = useRef();
    const handleSubmit = (event) => {
      event.preventDefault();;
      setNotFound(false);
      return $http.get('articles', {
        params:{
          pageNum: 1,
          pageSize: 10,
          text: searchText
        }
      }).then(response => {
        const { data } = response;
        setNotFound(data.length === 0);
        setMatchedArticles(data)
      });
    };

    useEffect(function () {
      if (visible) {
        inputRef.current && inputRef.current.focus();
      } else {
        setTimeout(() => {
          setMatchedArticles([]);
          setSearchText('');
        }, 370);
      }
    }, [visible]);

    const className4searcPanel = visible ? 'search active' : 'search';
    return (
        <div className={className4searcPanel}>
            <form className="table-center" onSubmit={handleSubmit}>
            <input type="text" id="search"
                ref={inputRef}
                placeholder="搜索"
                value={searchText}
                onChange={event => setSearchText(event.target.value)}
                />
            </form>
            { notFound ? <p className="notFound">没找到相关文章</p> : null}
            <ul className="list-inline matchResults">{
              matchedArticles.map(({_id, title, modified}) => (
                <li className="matchedArticle list-inline-item" key={_id}>
                <time className="color-gray font-14">{modified}</time>
                <p className="text-truncate">
                    <Link to={`/article/${_id}`} onClick={toggleSearchPanel} >{title}</Link>
                </p>
                </li>
            ))
            }</ul>
        <label className="closePanel" onClick={toggleSearchPanel}></label>
        </div>
    )
}

export default SearchPanel;