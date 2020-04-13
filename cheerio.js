let cheerio = require("cheerio")
let html = require("fs").readFileSync("html.html").toString()
let $ = cheerio.load(html)
let list = []
$(".decorated.stretch > tbody > tr").each((i, elem) => {
  if ($("td:nth-child(4)", elem).attr("style") != undefined) {
    
    // list.push($("a").attr("href"))
  }
})
console.log(list)
//.decorated.stretch > tbody > tr > td:nth-child(3)
//#formWiadomosci > div > div > table > tbody > tr > td:nth-child(2) > table.decorated.stretch > tbody > tr:nth-child(2) > td:nth-child(3)