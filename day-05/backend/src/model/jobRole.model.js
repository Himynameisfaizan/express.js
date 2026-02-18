const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  company_name: String,
  role: String,
  location: String,
});

const jobRole = mongoose.model("job_role", roleSchema)

module.exports = jobRole