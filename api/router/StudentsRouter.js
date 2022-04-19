const router = require("express").Router();

 const studentsController= require('../controller/StudentsController');

// get students 
router.get("/",studentsController.getStudens);
// insert students  
router.post("/",studentsController.insertStudens);
// delete students  
router.delete("/:id",studentsController.deleteStudens);
// find students
router.get("/find/:find",studentsController.findstudents);
// find students
router.get("/count",studentsController.countStudens);
// fakedata students
router.get("/fake",studentsController.fakedata);
module.exports = router;