import { message } from "antd";
import axios from "axios";
import marked from 'marked';

var $http = axios.create({
  baseURL:
  window.location.hostname === "localhost" ? "http://localhost:9999/api/" : "/api/", //  基础Api接口地址
  timeout: 5000
});

$http.interceptors.response.use(
  function({ data: { code, result, message = 'errors' } }) {
    if (code === "0000") {
      return result;
    } else {
      message.error(message || "errors");
      return Promise.reject(message);
    }
  },
  function({ config: { baseURL, url }, code }) {
    var errorText;
    // Do something with response error
    if (code === "ECONNABORTED") {
      errorText =
        "接口" +
        (process.env.NODE_ENV === 'development' ? `   ${baseURL + url} ` : '') +
        "请求超时，请稍后再试！";
      message.error(errorText);
    }
    return Promise.reject(errorText);
  }
);

function noop () {}

const markdownRender = new marked.Renderer();
const oldRender4link = markdownRender.link;
const oldRender4code = markdownRender.code;
const oldRender4image = markdownRender.image;
const oldRender4table = markdownRender.table;
markdownRender.link = function (href, title, text) {
  const linkHtml = oldRender4link.call(this, href, title, text);

  return linkHtml.slice(0, 3) + 'target="_blank" ' + linkHtml.slice(3);
}

markdownRender.code = function (code, lang, escape) {
  const html = oldRender4code.call(this, code, lang, escape);
  const regex = /<pre><code>/;
  return regex.test(html) ? html.replace(regex, '<pre><code class="hljs">') : html;
}

markdownRender.image = function (href, title, text) {
  const html = oldRender4image.call(this, href, title, text);
  const insertIndex = 5;
  return html.slice(0, insertIndex) + 'class="markdown-img" ' + html.slice(insertIndex);
}

markdownRender.table = function (headerStr, bodyStr) {
  const html = oldRender4table.call(this, headerStr, bodyStr);
  const insertIndex = 6;
  return html.slice(0, insertIndex) + ' class="table table-bordered table-hover"' + html.slice(insertIndex);
}

marked.setOptions({
  renderer: markdownRender,
  langPrefix: 'hljs ',
  highlight: function(code, lang) {
    return window.hljs.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

export {
  $http,
  noop,
  marked
}
