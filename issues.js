const request = require("request");
const cheerio = require("cheerio");
const { func } = require("assert-plus");
const fs = require("fs");
const path = require("path");
const { create } = require("combined-stream");
const pdfkit = require("pdfkit");

function getIssuesPageHtml(url, topic, repoName) {
  request(url, cb);

  console.log(url);

  function cb(err, response, html) {
    if (err) {
      console.log(err);
    } else if (response.statusCode == 404) {
      console.log("page not found");
    } else {
      //   console.log(html);
      getIssues(html, topic, repoName);
    }
  }
}

function getIssues(html, topic, repoName) {
  let $ = cheerio.load(html);

  let issuesElemArr = $(
    ".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title"
  );

  let arr = [];

  for (let i = 0; i < issuesElemArr.length; i++) {
    let link = $(issuesElemArr[i]).attr("href");

    // console.log(link);
    arr.push(link);
  }

  let folderPath = path.join(__dirname, topic);

  createDirectory(folderPath);
  let filePath = path.join(folderPath, repoName + ".pdf");
  let text = JSON.stringify(arr);
  pdfDoc = new pdfkit();

  pdfDoc.pipe(fs.createWriteStream(filePath));
  pdfDoc.text(text);
  pdfDoc.end();

}

function createDirectory(folderPath) {
  if (fs.existsSync(folderPath) == false) {
    fs.mkdirSync(folderPath);
  }
}

module.exports = getIssuesPageHtml;
