// express 

var express=require('express')
var app=express()
var cors=require('cors')
app.use(cors())
app.use(express.json())

const mongoose=require('mongoose')
mongoose
.connect('mongodb://localhost:27017/ExpenseTracker')
.then(console.log("connected to mongo"))

const expenseSchema= new mongoose.Schema({
    date:{type:String,required:true},
    category:{type:String,required:true},
    amount:{type:Number,required:true},
})

let Expenses =mongoose.model("Expenses",expenseSchema)

app.get("/api",async(req,res)=>{
    const expenses=await Expenses.find()
    res.json(expenses)
})

app.post('/api',(req,res)=>{
    const {date,category,amount}=req.body
    const newitem=new Expenses({date: new Date().toLocaleDateString(),category,amount})
    newitem.save();
    res.status(200).json(newitem)
 })

 app.put("/api/:id",async(req,res)=>{
    let _id=req.params.id;
    console.log(_id)
    const itemtoupdate=await Expenses.findByIdAndUpdate(_id,req.body)
    if(!itemtoupdate) return  res.status(404).send("No item found with given id")
    res.status(200).send(req.body)
 })

 app.delete("/api/:id",async(req,res)=>{
    let _id=req.params.id;
    console.log(_id)
    const itemtoupdate=await Expenses.findByIdAndDelete(_id)
    if(!itemtoupdate) return  res.status(404).send("No item found with given id")
    res.status(200).send("deleted")
 })
 
 app.listen(3000,()=>{
    console.log("server started....")
 })






 





















//node

/*var http=require('http')
var module=require("./module")
var url=require('url')
var fs=require('fs')

http.createServer((req,res)=>{
    //res.write(req.url)  // it will display the words after /.
    // var queryobj=url.parse(req.url,true).query
    // var ans=module.sum(parseInt(queryobj.a),parseInt(queryobj.b))   //http://localhost:8000/?a=10&b=20
    // res.write("sum: "+String(ans)+"\n")
    // var an=module.mul(parseInt(queryobj.a),parseInt(queryobj.b))   
    // res.write("pro: "+String(an)+"\n")
    // var a=module.sub(parseInt(queryobj.a),parseInt(queryobj.b))   
    // res.write("sub: "+String(a)+"\n")
    // var anss=module.div(parseInt(queryobj.a),parseInt(queryobj.b))   
    // res.write("div: "+String(anss)+"\n")
    
    // res.end('hello world')


    //read

    fs.readFile("demo.html",(err,data)=>{    // readFile(filename,callback(err,data))
        res.write(data)
        res.end()
    })

    //write

    fs.writeFile("text.txt","helloworld",(err)=>{  //readFile(filename,the content to overwrite in file,)
        console.log(err);
        res.end()
    })

    //add

   fs.appendFile("text.txt","appended new data",(err)=>{
        console.log(err)
    })
    res.end()

    //delete
    fs.unlink("text2.txt",()=>{        //it deletes the file newly created
        console.log("file deleted")
    })
    res.end();



}).listen(8000),console.log("server started....")*/