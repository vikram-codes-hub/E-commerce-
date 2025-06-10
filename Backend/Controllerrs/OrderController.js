
import orderModel from "../models/ordermodel.js"
import userModel from "../models/userschema.js"
import Stripe from 'stripe'

const currency='usd'
const deliverycharges=10
//payment gateway

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder=async(req,res)=>{
try {
  
  const {userId,items,amount,address}=req.body
  //  console.log("Order request body:", req.body);
  const orderData={
    userId,items,address,amount, paymentMethod:"COD",payment:false,date:Date.now()
  }

  const neworder=new orderModel(orderData)
  await neworder.save()
  await userModel.findByIdAndUpdate(userId,{cartData:{}})
  res.json({ success: true, message: "Order placed successfully", order:neworder });
} catch (error) {
      res.status(500).json({ success: false, message: error.message });
}
}

//using stripe method

const placeOrderStripe=async(req,res)=>{
  try {
    const {userId,items,amount,address}=req.body
    const {origin}=req.headers
     console.log("Stripe order request body:", req.body);

    const orderData={
      userId,items,address,amount,paymentMethod:"Stripe",payment:false,date:Date.now()
    }
    const neworder=new orderModel(orderData)
    await neworder.save()
   const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    }));

    // Add delivery charges as a line item
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges"
        },
        unit_amount: deliverycharges * 100
      },
      quantity: 1
    });
const session = await stripe.checkout.sessions.create({
   success_url: `${origin}/verify?success=true&orderId=${neworder._id}`,
   cancel_url: `${origin}/verify?success=false&orderId=${neworder._id}`,
    mode: 'payment',line_items
})

   res.json({ success: true,session_url:session.url});
} catch (error) {
       console.log("Stripe order error:", error); // <--- Add this!
    res.status(500).json({ success: false, message: error.message });
}
}

const verifyStripe = async (req, res) => {
  try {
    const { orderId } = req.body;
    console.log("orderId from body:", orderId);

    if (!orderId) {
      return res.json({ success: false, message: "Order ID is required" });
    }

    // Find the order
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    // Mark as paid
    order.payment = true;
    await order.save();

    // Optionally clear user's cart
    await userModel.findByIdAndUpdate(order.userId, { cartData: {} });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//using Razorpay method

const placeOrderRazorpay=async(req,res)=>{

}

//All order data for admin panel

const allOrders = async (req, res) => {
  try {
    // console.log("allOrders called");
    const orders = await orderModel.find({}).sort({ date: -1 }); // Fetch all orders
    res.json({ success: true, orders });
  } catch (error) {
    console.log("allOrders error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//User order data for frontend
const userORders = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }
    const orders = await orderModel.find({ userId }).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//update order status from admin panel

const updateStatue=async(req,res)=>{
try {
  const {orderId,status}=req.body
  await orderModel.findByIdAndUpdate(orderId,{status})
 res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userORders,
  updateStatue,
  verifyStripe
};