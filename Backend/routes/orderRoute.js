import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userORders,
  updateStatue,verifyStripe
} from "../Controllerrs/OrderController.js";
import adminAuth from "../middelware/adminauthmiddelware.js";
import authuser from "../middelware/Auth.js";

const orderRouter = express.Router();

//admin features
orderRouter.get("/list",adminAuth, allOrders);
orderRouter.post("/update-status",adminAuth, updateStatue);


orderRouter.post("/place",authuser, placeOrder);
orderRouter.post("/place-stripe",authuser, placeOrderStripe);
orderRouter.post("/place-razorpay",authuser, placeOrderRazorpay);

//user feature
orderRouter.post("/user",authuser, userORders);


//verify payment

orderRouter.post('/verifyStripe',authuser,verifyStripe)
export default orderRouter;