import mongoose, { mongo } from "mongoose"


const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: {type:Array,require:true}, // Array of image URLs
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: {type:Array,required:true}, // e.g. ["S", "M", "L", "XL"]
  bestseller:{type:Boolean},
  Date: { type: Number, default: Date.now }
});

const Product =mongoose.model.Product || mongoose.model("Product", productSchema);

export default Product;