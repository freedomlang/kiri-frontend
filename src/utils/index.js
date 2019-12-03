import { message } from "antd";
import showdown from "showdown";
import axios from "axios";

function htmlunencode(text) {
  return (
    text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
    );
}

const mapLanguage = {
  zsh: 'bash'
}

var $http = axios.create({
  baseURL:
  window.location.hostname === "localhost" ? "http://localhost:9999/api/" : "/api/", //  基础Api接口地址
  timeout: 19000
});

$http.interceptors.response.use(
  function(response) {
    console.log(response);
    if (response.data.code === "0000") {
      return response.data.result;
    } else {
      message.error(response.data.message || "errors");
      return Promise.reject(response.data.message);
    }
  },
  function(error) {
    var errorText;
    // Do something with response error
    if (error.code === "ECONNABORTED") {
      errorText =
        "接口 " +
        error.config.url.replace(error.config.baseURL, "") +
        " 请求超时，请稍后再试！";
      message.error(errorText);
    }
    return Promise.reject(errorText);
  }
);

// From https://github.com/showdownjs/showdown/issues/337#issuecomment-277355686
showdown.extension('targetlink', function() {
  return [{
    type: 'html',
    regex: /(<a [^>]+?)(>.*<\/a>)/g,
    replace: '$1 target="_blank"$2'
  }];
});

showdown.extension('addClass2img', function() {
  return [{
    type: 'html',
    regex: /(<img [^>]+?)(>)/g,
    replace: '$1 class="markdown-img"$2'
  }];
});

showdown.extension("highlight", function() {
  return [
    {
      type: "output",
      filter: function(text, converter, options) {
        var left = "<pre><code\\b[^>]*>",
          right = "</code></pre>",
          flags = "g";
        var replacement = function(wholeMatch, match, left, right) {
          match = htmlunencode(match);
          let lang = (left.match(/class=\"([^ \"]+)/) || [])[1];
          if (left.indexOf('class') === -1) left = left.slice(0, 10) + ' class=""' + left.slice(-1);
          left = left.slice(0, 18) + "hljs " + left.slice(18);
          if (lang) {
            lang = mapLanguage[lang] || lang;
            left = left.slice(0, 4) + ` alt="${lang}"` + left.slice(4);
            if (window.hljs.getLanguage(lang)) return left + window.hljs.highlight(lang, match, true).value + right; 
          }
          
          return left + window.hljs.highlightAuto(match).value + right;
        };
        return showdown.helper.replaceRecursiveRegExp(
          text,
          replacement,
          left,
          right,
          flags
        );
      }
    }
  ];
});

showdown.extension('addClass2table', function() {
  return [{
    type: 'html',
    regex: /(<table)(>)/g,
    replace: '$1 class="table table-bordered table-hover"$2'
  }];
});

const converter = new showdown.Converter({
  tables: true,
  extensions: ['highlight', 'targetlink', 'addClass2img', 'addClass2table']
});

export {
  converter,
  $http
}
