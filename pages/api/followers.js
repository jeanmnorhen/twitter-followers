const cheerio = require('cheerio') // 1

export default async (req, res) => { // 2
  if (req.method === 'POST') { // 3
    const username = req.body.TWuser

    try { // 4
      const $ = cheerio.load(`https://www.casasbahia.com.br/`)
      $('a.lnkPop').each((i, element) => {
        const cheerioElement = $(element);
        const preco = cheerioElement.find('span');
        console.log(preco);
      });
      res.statusCode = 200
      return res.json({
        user: username,
        followerCount: String(preco),
      })
    } catch (e) { // 5
      res.statusCode = 404
      return res.json({
        user: username,
        error: `${username} not found. Tip: Double check the spelling.`,
        followerCount: -1,
      })
    }
  }
}