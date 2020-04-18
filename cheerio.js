let cheerio = require("cheerio");
let list = [];
module.exports.parse = (html) => { 
  let $ = cheerio.load(html)
  $(".decorated.stretch > tbody > tr").each((i, elem) => {
    // console.log(pretty($(elem).html()))
    if ($("td:nth-child(4)", elem).attr("style") != undefined) {
        list.push($("td:nth-child(4) > a", elem).attr("href"))
        // console.log($("td:nth-child(4) > a", elem).text())
    }
  })
  return list 
}
// let html = require("fs").readFileSync("html.html").toString()
// var pretty = require('pretty');
// console.log(list)
