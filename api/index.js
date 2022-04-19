const express = require('express');
const app = express();
const cors = require('cors');
const  dotenv = require('dotenv');
const mongoose = require('mongoose');

const studentsRouter = require('./router/StudentsRouter')
dotenv.config();
app.use(cors());
app.use(express.json());
// connect database
app.use("/api/student",studentsRouter)
mongoose
  .connect(process.env.MONGO_URL,{ useNewUrlParser: true,
     useUnifiedTopology: true ,
     })
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

//routers
app.listen(5000, ()=> console.log('server is running....'))