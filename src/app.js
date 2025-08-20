const {response}=require("express");
const express =require("express");
require("./db/connection");
const student=require("./model/student");
const studentRouter=require("./routers/routing")
const app=express();
const port=process.env.PORT||8000;

app.use(express.json());

app.use(studentRouter);



app.post("/student", async(req, res) => {
  try{
    const user=new student(req.body);
    const createUser=await user.save();
    res.status(201).send(createUser);
  }catch(err){
    res.status(400).send(err);
  }
  // console.log(req.body);
  // const user=new student(req.body);
  // user.save().then(()=>{
  //   res.status(201).send(user);
  // }).catch((err)=>{
  //   res.status(400).send(err);
  // })
  //res.send("Hello, World!");
})
//This function reads or gets all the data from student collection
app.get("/student",async(req,res)=>{
    try{
      const getData=await student.find();
      res.send(getData);
    }
    catch(err){
      res.status(400).send(err);
    }
})

//this method reads or gets data from student collection
app.get("/student/:id",async(req,res)=>{
  try{
    const _id=req.params.id;
    const specificData=await student.findById(_id);
    console.log(specificData);
    if(!specificData){
      res.status(404).send();
    }else{
      res.send(specificData);
    }
  }
  catch(err){
    res.send(err);
  }
})

//This method will update some fields in your specific document
app.patch("/student/:id",async(req,res)=>{
  try{
    const _id=req.params.id;
    const updateStudent=await student.findByIdAndUpdate(_id,req.body,{
      new:true,
    })
    res.send(updateStudent);
  }
  catch(err){
    res.status(500).send(err);
  }
})

//THis method will delete the specific data from the collection
app.delete("/student/:id",async(req,res)=>{
  try{
    const _id=req.params.id;
    const deleteStudent=await student.findByIdAndDelete(_id);
    if(!_id){
      return res.status(400).send();
    }else{
      res.send(deleteStudent);
    }
  }
  catch(err){
    res.status(500).send(err);
  }
})
app.listen(port,()=>{
    console.log(`Connection is set up at ${port}`);
})