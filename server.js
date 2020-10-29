var express = require("express")
var app = express()
var mysql = require("mysql")
var bodyParser = require("body-parser")

var cors= require("cors")
app.use(cors())

//json parser
var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({extended:false})


var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database :"product_db"
})

con.connect((err)=>{
    if(err) throw err
    console.log("connected to database")
})
//get products
app.get("/products",function(req,res){
    let sql = "SELECT * FROM products"
    let query = conn.query(sql, (err, results)=>{
        if (err) throw errres.send(JSON.stringify({"status": 200, "error": null, "response": results}))
    })
     })
 
//get single products
app.get("/products/:id",function(req,res){
    let sql = "SELECT * FROM products"
    let query = conn.query(sql, (err, results)=>{
        if (err) throw errres.send(JSON.stringify({"status": 200, "error": null, "response": results}))
    })

})
//post a new product
app.post("/products",function(req,res){
    let data = {product_name:req.body.product_name,colour:req.body.colour,price:req.body.price}
    let sql = "INSERT INTO products SET ?"
    let query = conn.query(sql, data,(err, results)=>{
        if (err) throw err
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}))   
    })
})
//update a product
app.patch("/product/:id",function(req,res){
    let sql="UPDATE products SET product_name='"+req.body.product_name+"',colour='"+req.body.colour+"',price='"+req.body.price+"' WHERE id="+req.params.id
    let query = conn.query(sql, (err, results)=>{
        if (err) throw err
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}))
    })
})

//delete a book
app.delete("/products/:id",function(req,res){
    let sql = "DELETE FROM product WHERE id="+req.params.id+""
    let query = conn.query(sql, (err, results)=>{
        if (err) throw err
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}))
    })
})

app.get("/",function(req,res){
    res.send("<h1>Welcome page</h1>")
})


app.listen(9000,function(){
    console.log("server started")
})
