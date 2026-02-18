const express = require("express");
const jobRole = require("./model/jobRole.model");
const todoModel = require("./model/todo.model");
const cors = require("cors")
const app = express();
app.use(cors())
app.use(express.json());

// POST /job-role
// status 201

app.post("/job-role", async (req, res) => {
  const { role, company_name, location } = req.body;

  const job = await jobRole.create({
    role,
    company_name,
    location,
  });

  res.status(201).json({
    message: "job role created successfully",
    job,
  });
});

// creating todo api with post
app.post("/todo", async (req, res) => {
  const { title } = req.body;

  const todo = await todoModel.create({
    title,
  });

  res.status(201).json({
    message: "todo created successfully",
    todo,
  });
});

app.get("/todo", async (req, res) => {
  const todo = await todoModel.find();

  res.status(200).json({
    message: "todos fetched successfully",
    todo,
  });
});

app.patch("/todo/:id", async (req, res) => {
    const {title} = req.body
  const id = req.params.id;
  const todo = await todoModel.findByIdAndUpdate(id, {title});

  res.status(200).json({
    message: "todos modified successfully",
    todo,
  });
});

app.delete("/todo/:id", async (req, res)=>{
    const id = req.params.id;
   const todo = await todoModel.findByIdAndDelete(id);

   res.status(200).json({
    message: 'todo deleted successfully'
   })

})

module.exports = app;
