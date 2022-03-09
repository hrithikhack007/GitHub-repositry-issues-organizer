let url = "https://github.com/topics";

const request = require("request");
const cheerio = require("cheerio");
const getReposPageHtml = require("./responsePage");

request(url, cb);

function cb(err, respones, html) {
  if (err) {
    console.log(err);
  } else {
    // console.log(html);

    getTopicLinks(html);
  }
}

function getTopicLinks(html) {
  let $ = cheerio.load(html);

  let linkElementArr = $(
    ".no-underline.d-flex.flex-column.flex-justify-center"
  );

  for (let i = 0; i < linkElementArr.length; i++) {
    let href = $(linkElementArr[i]).attr("href");
    // console.log(href);
    let fullLink = `https://github.com${href}`;
    // console.log(fullLink);
    let topic = href.split("/").pop();
    getReposPageHtml(fullLink,topic);
  }
}
