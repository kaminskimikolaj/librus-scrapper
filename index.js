const cheerio = require('cheerio');
var rp = require('request-promise');
var request = require('request')
rp = rp.defaults({
  jar: true,
  // proxy: "http://localhost:9090",
  simple: false,
  // rejectUnauthorized: false,
  // forever: true,
  followRedirect: false,
  agent: false })

let options = [
  //1
  {
    url: 'https://portal.librus.pl/rodzina',
  },

  //2
  {
    url: 'https://portal.librus.pl/rodzina/synergia/loguj',
    headers: {
      'Referer': 'https://portal.librus.pl/rodzina'
    }
  },

  //3
  {
    url: '',
    headers: {
      'Referer': 'https://portal.librus.pl/rodzina/synergia/loguj'
    }
  },


  //4
  {
    url: 'https://api.librus.pl/OAuth/Authorization?client_id=46&response_type=code&scope=mydata',
    headers: {
      'Referer': 'https://portal.librus.pl/rodzina/synergia/loguj'
    }
  },

  //5
  {
    url: 'https://api.librus.pl/OAuth/Authorization?client_id=46',
    headers: {
      'Referer': 'https://portal.librus.pl/rodzina/synergia/loguj'
    }
  },

  //6
  {
    url: 'https://api.librus.pl/OAuth/Captcha',
    method: "POST",
    body: "username=5426828u&is_needed=1",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': 'https://api.librus.pl/OAuth/Authorization?client_id=46'
    }
  },

  //7
  {
    url: 'https://api.librus.pl/OAuth/Authorization?client_id=46',
    method: "POST",
    body: "action=login&login=5426828u&pass=JebacLibrus69",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': 'https://api.librus.pl/OAuth/Authorization?client_id=46'
    }
  },

  //8
  {
    url: 'https://api.librus.pl/OAuth/Authorization/Grant?client_id=46',
    resolveWithFullResponse: true,
    headers: {
      'Referer': 'https://api.librus.pl/OAuth/Authorization?client_id=46'
    }
  },

  //9
  {
    url: '',
    resolveWithFullResponse: true,
    headers: {
      'Referer': 'https://api.librus.pl/OAuth/Authorization?client_id=46'
    }
  },

  //10
  {
    url: 'https://synergia.librus.pl/uczen/index',
    resolveWithFullResponse: true,
    headers: {
      'Referer': 'https://portal.librus.pl/rodzina/synergia/loguj'
    }
  },

  {
    url: 'https://synergia.librus.pl/wiadomosci',
    headers: {
      'Referer': 'https://synergia.librus.pl/uczen/index'
    }
  }
];

(async()=>{
  await rp(options[0])
  console.log("First request completed")

  var $ = cheerio.load(await rp(options[1]))
  let src = $('#caLoginIframe').attr('src')
  options[2].url = src
  console.log("Second request completed, extracted src code", src)

  await rp(options[2])
  console.log("Third request completed")

  await rp(options[3])
  console.log("Fourth request completed")

  await rp(options[4])
  console.log("Fifth request completed")

  console.log("Sixth request completed", await rp(options[5]))

  console.log("Seventh request completed", await rp(options[6]))

  async function request7() {
    return new Promise((resolve) => {
      rp(options[7])
      .then(function (response) {
          resolve(response.headers.location);
      });
    })
  }
  let location = await request7()
  console.log("eighth request completed, extracted location", location)
  options[8].url = location

  await rp(options[8])
  console.log("Ningh request commpleted")

  await rp(options[9])
  console.log("Tenth request completed, login process successful!")

  messagesResponseHtml = await rp(options[10])
  console.log("Eleventh request completed")
  $ = cheerio.load(messagesResponseHtml)
})()