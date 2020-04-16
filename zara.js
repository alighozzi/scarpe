const fetch = require('node-fetch')
const cheerio = require('cheerio')
//const fs = require('fs')
//const writeStream = fs.createWriteStream('post.csv')

const url = 'https://www.zara.com/ma/fr/search?searchTerm='

searchItems = (searchTerm) =>{
    return fetch (`${url}${searchTerm}`)
    .then(response => response.text())
    .then(body =>{
        const produits= []
        const $= cheerio.load(body)
        $('a.item').each((i, element) =>{
            const $element= $(element)
            const titre= $element.find('div.product-info-item a').text()
            // const prix = $element.find('div.product-price').text().replace(/\s\s+/g,'')
            // // const tailles= []
            // // $element.find('.sizes ul li ').each((i, el)=>{
            // //     const taille =$(el).text()
            // //     tailles.push(taille)
            // // })
            // //const link = $('div.product-tile-inner a').attr('href')
            // const image=$('a.product-item-image-link img').attr('src')
            // const link1=$('a.product-item-image-link').attr('href')
            // const link= 'https://www.lcwaikiki.ma'+link1
           // writeStream.write(`${titre},${prix} \n`)
            const produit = {
                //image,
                titre,
                // prix,
                // link
             }
             produits.push(produit)
        })
        return produits
    })
    
}
module.exports = {searchItems}