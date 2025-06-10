import express from 'express'
import {addtocart,updatecart,getusercart} from'../Controllerrs/Cartcontroller.js'
import authuser from '../middelware/Auth.js'

const cartrouter=express.Router()

cartrouter.post('/get',authuser,getusercart)
cartrouter.post('/add',authuser,addtocart)
cartrouter.post('/update',authuser,updatecart)

export default cartrouter