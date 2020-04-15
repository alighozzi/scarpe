const express = require ('express')
const scarpingEtam= require('./etam')
const scarpingWaikiki = require('./waikiki')
const app= express()

app.get('/etam/search/:nom' , (req, res) =>{
    scarpingEtam.searchItems(req.params.nom)
    .then(produits =>{
        res.json(produits)
    })
})

app.get('/waikiki/search/:nom' , (req, res) =>{
    scarpingWaikiki.searchItems(req.params.nom)
    .then(produits =>{
        res.json(produits)
    })
})

const port = process.env.PORT || 3000
app.listen(port , () =>{
    console.log('listing on port ' + port)
})
