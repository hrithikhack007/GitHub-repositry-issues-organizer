const request = require("request");
const cheerio = require("cheerio");

const getIssuesPageHtml = require("./issues");

function getReposPageHtml(url, topic) {
  request(url, cb);

  function cb(err, respnse, html) {
    if (err) {
      console.log(err);
    } else {
      //   console.log(html);
      //   console.log(url);
      getReposLink(html, topic);
    }
  }
}

function getReposLink(html, topic) {
  let $ = cheerio.load(html);

  let headingsArr = $(".f3.color-fg-muted.text-normal.lh-condensed");

//   console.log(topic);
  for (let i = 0; i < 8; i++) {
    let twoAnchors = $(headingsArr[i]).find("a");
    let link = $(twoAnchors[1]).attr("href");

    let fullLink = `https://github.com${link}/issues`;

    let repoName = link.split("/").pop();

    getIssuesPageHtml(fullLink, topic,repoName);
  }
  console.log(`------------------`);
}

module.exports = getReposPageHtml;
