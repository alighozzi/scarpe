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
        $('.product-tile-inner').each((i, element) =>{
            const $element= $(element)
            const titre= $element.find('div.product-name').text().replace(/\s\s+/g,'')
            const prix = $element.find('div.product-pricing').text().replace(/\s\s+/g,'')
            const tailles= []
            $element.find('.sizes ul li ').each((i, el)=>{
                const taille =$(el).text()
                tailles.push(taille)
            })
            //const link = $('div.product-tile-inner a').attr('href')
            const image=$('a div span img').attr('src')
           // writeStream.write(`${titre},${prix} \n`)
            const produit = {
                image,
                titre ,
                tailles,
                prix,
                //link
             }
             produits.push(produit)
        })
        return produits
    })
    
}
module.exports = {searchItems}