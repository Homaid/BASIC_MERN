const express = require('express');
const fs  = require('fs')
const mongoose = require("mongoose")
const app = express();
const cors = require('cors');
const path = require('path')
// const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'))
// const products = data.products
// import mongoose from 'mongoose';
const { Schema } = mongoose;
// console.log(products)

app.use(express.json());
app.use(cors())
const PORT = 4000;
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/books');
  console.log("Database connneted")

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
//Schema

const productSchema = new Schema({
    title: String, // String is shorthand for {type: String}
    description: String,
    price: Number,
    discountPercentage: Number,
    rating:{type : Number } ,
    brand: String,
    category : String,
    thumbnail: String,
    image: String
  });

  const Product = mongoose.model('Product', productSchema);










app.get("/products", async (req,res) => { 
  
  const products =  await Product.find()
    res.json(products )


})
app.get("/products/:id", async (req,res) => {
    const id = req.params.id
    //  products.filter( (x) => {
    //     if(x.id == id){
    //         return res.json(x)
    //     }
    //  })
    const p = await Product.findById(id)
    

    res.json(p)


})
app.post("/products", (req,res) =>  {
    // products.push(req.body)
    // res.json(req.body)
    const product = new Product(req.body)
    // product.title = "Ipohoe"
    // product.price = 10000
    // product.rating = 5;
    async function saveProduct(product) {
        try {
          const doc = await product.save();
          console.log({ doc });
          res.json({doc})
         
        } catch (err) {
          console.log({ err });
        }
      }
      saveProduct(product);

    

    // res.json({
    //     "product" : "sucessfully upload"
    // })
})

app.put("/products/:id", async (req,res) => {
    const id = req.params.id
    // const Index = products.findIndex((p) => {
    //     if(p.id === id){
    //      return p;
    //     }
    //  })
//    console.log(Index)
// const product = products[Index]
  
//    products.splice(Index,1, {...product,...req.body})
const doc = await Product.findOneAndReplace({
    _id : id 
}, req.body)
   

    res.json(doc)
})
app.patch("/products/:id", async (req,res) => {
    const id = req.params.id
//     const Index = products.findIndex((p) => {
//         if(p.id === id){
//          return p;
//         }
//      })
//    console.log(Index)
// const p = await Product.findById(id)
//    products.splice(Index,1, { id : id})
const Query =   await Product.findOneAndUpdate({
    _id : id
}, req.body) 

   
// console.log(Query)

    res.json(req.body)


})
app.delete("/products/:id", async (req,res) => {
    const id = req.params.id
    // const Index = products.findIndex((p) => {
    //     if(p.id === id){
    //      return p;
    //     }
    //  })
//    console.log(Index)

  //  products.splice(Index,1)
  const doc  = await Product.findOneAndDelete({
    _id : id
  })
   
   res.json(doc)

    // res.json(products)


})
// app.delete("/", (req,res) => {

// })

app.use(express.static("build"))

app.use('*', (req,res) => {
    res.sendFile(__dirname+'/build/index.html')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



//USERNAME == homaidafroz88
//password == WoWxsydJo6hFn8Tr