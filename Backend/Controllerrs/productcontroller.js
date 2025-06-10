import cloudinary from 'cloudinary'
import Product from '../models/productmodel.js';

//function for adding product
const addproduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;
    // const product = new Product({
    //     name,
    //     description,
    //     price,
    //     image, 
    //     category,
    //     sizes,
    //     inStock
    // });
    const image1 =req.files.image1 && req.files.image1[0];
    const image2 =req.files.image2 && req.files.image2[0];
    const image3 =req.files.image3 && req.files.image3[0];
    const image4 =req.files.image4 && req.files.image4[0];

    const images=[image1,image2,image3,image4].filter((item)=>item!==undefined)

      const imageUrls = await Promise.all(
      images.map(async (img) => {
        const result = await cloudinary.uploader.upload(img.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );
   const productdata={
    name,description,  category,price:Number(price),subCategory, bestseller:bestseller==="true"?true:false,
    sizes:JSON.parse(sizes),image:imageUrls,date:Date.now()
   }
   console.log(productdata)
    const product=new Product(productdata)
    await product.save()

    res.json({success:true,mssg:"Product Added"})
  }catch (error) {
    console.log(error)
        res.json({ success: false, mssg: error.message });
    }
}


//function for listing product
const listproduct = async (req, res) => {
  try {
    const products=await Product.find({})
        res.json({ success: true, products });
  } catch (error) {
    console.log(error)
    res.json({ success: false, mssg: error.message });
  }
};

//function for removing product
const removeproduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.body.id)
    res.json({ success: true, mssg: "Product removed"})
  } catch (error) {
     console.log(error);
    res.json({ success: false, mssg: error.message });
  }
};

//for single product info
const singleproduct = async (req, res) => {
try {
    const { id } = req.body; // or use req.params.id if you use URL params
    const product = await Product.findById(id);
    if (!product) {
      return res.json({ success: false, mssg: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, mssg: error.message });
  }
};
export { addproduct, listproduct, removeproduct, singleproduct };
