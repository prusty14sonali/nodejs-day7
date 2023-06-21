const mongoose = require('mongoose')
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;
const products = new schema({
    id:ObjectId,
    productName:{type:String,required:true},
    productPrice:{type:Number,required:true},
    productDescription:{type:String,required:true},
    date:{type: String}
})
module.exports = mongoose.model('products',products,'products')