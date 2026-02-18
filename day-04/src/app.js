const express = require("express");
const noteModel = require("./model/note.model");
const app = express();

app.use(express.json());

app.post("/note", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message:' note created successfully',
    note
  })
});


app.get("/note", async (req,res)=>{

    const note = await noteModel.find();
    res.status(200).json({
        message:"note fetched successfully",
        note
    })
})

module.exports = app;
