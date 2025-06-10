import express from 'express'
import  {addproduct,listproduct,removeproduct,singleproduct} from '../Controllerrs/productcontroller.js'
import upload from '../middelware/multer.js'
import adminAuth from '../middelware/adminauthmiddelware.js'


const productRouter=express.Router()

productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxcount:1},{name:'image2',maxcount:1},{name:'image3',maxcount:1},{name:'image4',maxcount:1}]),addproduct)
productRouter.post('/remove',adminAuth,removeproduct)
productRouter.get('/listproduct', listproduct)
productRouter.post('/single',singleproduct)

export default  productRouter