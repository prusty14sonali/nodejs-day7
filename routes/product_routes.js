const express = require('express')

const prouter = express.Router();

const products = require('../models/products')
//POST END POINT
// prouter.post("/addProduct", (req, res) => {
//     req.body.date = new Date();
//     console.log(req.body)
//     products.create(req.body, (err, product) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.send("product added successfully");
//       }
//     });
//   });

prouter.post('/addProduct',(req,res)=>{
    //req.body.date=new Date()
    //console.log(req.body)
    
    // products.find((dberror,data)=>{
    //     if(dberror){
    //         res.send({
    //             message:dberror
    //         })
    //     }
    //     else{
            //console.log(data)
            //if(data.length === 0){
                req.body.dateTime = new Date();
                products.create(req.body,(err,product)=>{
                    if(err){
                        res.send(err.message)
                    }
                    else{
                        //res.redirect('/products/getProduct')
                        res.redirect('/products')
                    }
                })
            //}
            // else{
            //     res.send("Product already added")
            // }
    //     }
    // })
})
//products end point with render response
//   prouter.get('/',(req,res)=>{
//       res.render('products.ejs',{productsData})
//   })
prouter.get('/',(req,res)=>{
    //res.render('products.ejs')
    products.find().then((results)=>
    {
        //res.render('showProducts.ejs',{productsData:results})
        res.render('products.ejs',{productsData: results,form1:'Add Form',form2:'Update Form',form3:'Delete Form'})
    }).catch((err)=>
    {res.send(err.message)
    })
})

//update end point
prouter.post('/updateProduct',(req,res)=>{
    products.findOneAndUpdate({productName:req.body.productName},{$set:{productPrice:req.body.productPrice}}).then((dbresponse)=>
    {
        // res.send("product price details updated succesfully")
        res.redirect('/products');
    }).catch((err)=>
    {console.log(err)
    })
})


prouter.post('/deleteProduct',(req,res)=>{
    products.findOneAndDelete({productName:req.body.productName}).then((dbresponse)=>
    {
        // res.send("product price details deleted succesfully")
        res.redirect('/products');
    }).catch((err)=>
    {console.log(err)
    })
})

module.exports = prouter;