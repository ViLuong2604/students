
const mongoose = require("mongoose");

const StudentsSchema = new mongoose.Schema(
  {
    name :{type : String},
    subject :{type : String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Students", StudentsSchema);