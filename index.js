const express = require ('express')
const scarpingEtam= require('./etam')
const app= express()

app.get('/search/:nom' , (req, res) =>{
    scarpingEtam.searchItems(req.params.nom)
    .then(produits =>{
        res.json(produits)
    })
})

const port = process.env.PORT || 3000
app.listen(port , () =>{
    console.log('listing on port ' + port)
})
