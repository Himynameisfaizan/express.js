const express = require('express');

const app = express();


app.use(express.json())



app.get("/",(req,res)=>{
    res.send("aserver is runnig")
})

const notes = []

app.post("/notes", (req,res)=>{

    notes.push(req.body)
    console.log(notes);
    res.send(notes)
})

app.get('/notes', (req,res)=>{
    res.send(notes)
})
module.exports = app