const express = require('express')
const app = express()
const log4js = require("log4js")
const port = 8001

log4js.configure({
    appenders: {'out': {type: 'stdout'}},
    categories: {default: {appenders: ['out'], level:'info'}}
});

const logger = log4js.getLogger()

app.get('/api', (req,res) =>{ 

    var myArr = [
        {title: "t-shirt", description: "funky and loud", price: 5, quantity: 0, size: "L", colour: "black"},
        {title: "jumper", description: "plain pattern", price: 10, quantity: 0, size: "XL", colour: "white"},
        {title: "jeans", description: "straight denim", price: 15, quantity: 0, size: "34W30L", colour: "blue"},
        {title: "polo shirt", description: "plain", price: 5, quantity: 0, size: "S", colour: "black"}
      ]
    res.send(myArr)
    logger.info('sent product to UI')
})



app.listen(port, () => console.log(`Example app listening on port ${port}`))