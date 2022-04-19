const Students = require('../model/Students');
const StudentsController = ({
 // get students
     getStudens : async (req,res)=>{
      const sort = req.query.sort;
      const pageSize = req.query.pageSize;
      const page = req.query.page;
      const search = req.query.search;
      var skip = (page-1) *pageSize;
           try {
             let students;
             if(sort==='desc'){
               students =await Students.find({name : {$regex : new RegExp(search)}}).
               sort({name : -1}).skip(skip).limit(pageSize);
             }else if(sort==='asc'){
              students =await Students.find({name : {$regex : new RegExp(search)}}).
              sort({name : 1}).skip(skip).limit(pageSize);
            } else{
              students =await Students.find({ name : {$regex : new RegExp(search)} })
              .skip(skip).limit(pageSize);
             }
              res.status(200).json(students);

           } catch (error) {
                res.status(500).json(error);
           }
     },
     countStudens : async (req,res)=>{
      const search = req.query.search;
          try {
              const count =await Students.count({name : {$regex : new RegExp(search)}});
             res.status(200).json(count);

          } catch (error) {
               res.status(500).json(error);
          }
    },
     // delete students
     deleteStudens :async (req,res)=>{
         const id = req.params.id;
        try {
            await Students.findByIdAndDelete(id);
           res.status(200).json("delete success...");

        } catch (error) {
             res.status(500).json({error});
        }
  }
  ,   // insert students
     insertStudens :async (req,res)=>{
          const newstudents = new Students(req.body);

          try {
            const savedStudents = await newstudents.save();
            res.status(200).json(savedStudents);
          } catch (err) {
            res.status(500).json(err);
          }   
      },
      findstudents :async (req,res)=>{
    
          try {
            
            const findStudents =  await Students.find({
              name : {$regex : new RegExp(req.params.find)}
            }
            
              );
            res.status(200).json(findStudents)
          } catch (error) {
            res.status(500).json({error})
          }   
        },
        fakedata :async (req,res)=>{
         for (let i = 0; i < 50; i++) {
           const stu ={
             "name" : `Đình Tùng ${i}`,
             "subject" : "Anh Văn"
           }
           const newstudents = new Students(stu);
           await newstudents.save();
         }
         res.status(200).json("success...")
        },
        

 // search
 //phân trang
 // sấp xếp
})
module.exports = StudentsController;