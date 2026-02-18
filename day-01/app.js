const express = require('express')

const app = express() // server create

app.get('/', (req, res)=>{
    res.send("hello world")
})

app.get('/about', (req, res)=>{
    res.send("Hello this about page")
})

app.listen(3000)  // server start