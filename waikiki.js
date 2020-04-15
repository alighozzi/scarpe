const fetch = require('node-fetch')
const cheerio = require('cheerio')
//const fs = require('fs')
//const writeStream = fs.createWriteStream('post.csv')

const url = 'https://www.lcwaikiki.ma/list/?search_text='

searchItems = (searchTerm) =>{
    return fetch (`${url}${searchTerm}`)
    .then(response => response.text())
    .then(body =>{
        const produits= []
        const $= cheerio.load(body)
        $('.product-item-wrapper ').each((i, element) =>{
            const $element= $(element)
            const titre= $element.find('p.product-name a ').text().replace(/\s\s+/g,'')
            const prix = $element.find('div.product-price').text().replace(/\s\s+/g,'')
            // const tailles= []
            // $element.find('.sizes ul li ').each((i, el)=>{
            //     const taille =$(el).text()
            //     tailles.push(taille)
            // })
            //const link = $('div.product-tile-inner a').attr('href')
            const image=$('a.product-item-image-link img').attr('src')
            const link=$('a.product-item-image-link').attr('href')
            const finallink= 'https://www.lcwaikiki.ma'+link
           // writeStream.write(`${titre},${prix} \n`)
            const produit = {
                image,
                titre,
                prix,
                finallink
             }
             produits.push(produit)
        })
        return produits
    })
    
}
module.exports = {searchItems}