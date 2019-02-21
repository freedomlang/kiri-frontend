import { message } from "antd";
import showdown from "showdown";
import axios from "axios";

const mapLanguage = {
  zsh: 'bash'
}

var $http = axios.create({
  baseURL:
    window.location.port !== "80" ? "http://localhost:3002/api/" : "/api/", //  基础Api接口地址
  timeout: 5000
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

showdown.extension("highlight", function() {
  return [
    {
      type: "output",
      filter: function(text, converter, options) {
        var left = "<pre><code\\b[^>]*>",
          right = "</code></pre>",
          flags = "g";
        var replacement = function(wholeMatch, match, left, right) {
          var lang = (left.match(/class=\"([^ \"]+)/) || [])[1];
          left = left.slice(0, 18) + "hljs " + left.slice(18);
          left = left.slice(0, 4) + ` alt="${lang}"` + left.slice(4);
          if (lang) lang = mapLanguage[lang] || lang;
          if (lang && window.hljs.getLanguage(lang)) {
            return left + window.hljs.highlight(lang, match).value + right;
          } else {
            return left + window.hljs.highlightAuto(match).value + right;
          }
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

const converter = new showdown.Converter({ extensions: ['highlight'] })

export {
  converter,
  $http
}
