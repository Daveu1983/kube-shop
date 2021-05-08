const express = require('express')
const app = express()
const log4js = require("log4js")
const port = 8001
const axios =require("axios");


log4js.configure({
    appenders: {'out': {type: 'stdout'}},
    categories: {default: {appenders: ['out'], level:'info'}}
});

const logger = log4js.getLogger()


var products = [
    {title: "t-shirt", description: "funky and loud", price: 5, quantity: 0, size: "L", colour: "black"},
    {title: "jumper", description: "plain pattern", price: 10, quantity: 0, size: "XL", colour: "white"},
    {title: "jeans", description: "straight denim", price: 15, quantity: 0, size: "34W30L", colour: "blue"},
    {title: "polo shirt", description: "plain", price: 5, quantity: 0, size: "S", colour: "black"}
  ]
const getPrices = (oldPrices)=>{
    oldPrices.forEach(element => {
    axios.get(`http://localhost:5000/api?price=${element.price}`)
        .then(response => {
            console.log(response.data.price)
            element.price = response.data.price
           })
        .catch(function (error) {
           console.log(error);
           });
    })
    return oldPrices

}  

app.get('/api', (req,res) =>{ 
    var currentPrices = getPrices(products)
    res.send(currentPrices)
    logger.info('sent product to UI')
})



app.listen(port, () => console.log(`Example app listening on port ${port}`))