const fetch = require('node-fetch')
const cheerio = require('cheerio')
//const fs = require('fs')
//const writeStream = fs.createWriteStream('post.csv')

const url = 'https://www.etam.ma/recherche?q='

searchItems = (searchTerm) =>{
    return fetch (`${url}${searchTerm}`)
    .then(response => response.text())
    .then(body =>{
        const produits= []
        const $= cheerio.load(body)
        $('.search-result__item').each((i, element) =>{
            const $element= $(element)
            const titre= $element.find('h3.product-name-title').text().replace(/\s\s+/g,'')
            const prix = $element.find('div span.price').text().replace(/\s\s+/g,'')
            // const tailles= []
            // $element.find('.sizes ul li ').each((i, el)=>{
            //     const taille =$(el).text()
            //     tailles.push(taille)
            // })
            const link = "https://www.etam.ma" + $element.find('div.search-result__image a').attr('href')
            const image_src = $element.find('div.face-a img').attr('data-src')
           // writeStream.write(`${titre},${prix} \n`)
            const produit = {
                image_src,
                titre ,
                // tailles,
                 prix,
                link
             }
             produits.push(produit)
        })
        return produits
    })
    
}
module.exports = {searchItems}

/* TODO: manage pagination for 48+ results.
    #- each results page contains 48 results(max of elements displayed in a single page)
*/