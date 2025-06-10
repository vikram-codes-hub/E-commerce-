import userModel from "../models/userschema.js"

// Add to cart
const addtocart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) return res.status(404).json({ success: false, mssg: "User not found" });

    let cartData = userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, mssg: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, mssg: error.message });
  }
};

// Update cart
const updatecart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData;

    cartData[itemId][size] = quantity;
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, mssg: "Updated cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, mssg: error.message });
  }
};

// Get user cart
const getusercart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    const cartData = userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addtocart, updatecart, getusercart };