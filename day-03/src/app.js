const express = require("express")

const app = express()

app.use(express.json())

notes = []

app.get("/",(req, res)=>{
    res.json("Hello world")
})


app.post("/notes", (req,res)=>{
    notes.push(req.body)
    console.log(notes)
    res.json(notes)
})

app.get("/notes", (req,res)=>{
    res.json(notes);
})

app.patch("/notes/:index", (req,res)=>{
    res.params.index
})

module.exports = app