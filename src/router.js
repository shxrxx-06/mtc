import {Router} from "express";

import {createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct} from "./handlers/products.js";
import {createEnquiry, getAllEnquiries, getSingleEnquiry, updateEnquiry, deleteEnquiry} from "./handlers/enquiry.js";
import {updateDetails, getAllDetails, getSingleDetail, updateDetail, deleteDetail} from "./handlers/smas.js";
const router = Router()

/* ******** PRODUCT ROUTES ******** */

router.get('/products', getAllProducts)
router.get('/product/:id', getSingleProduct)
router.post('/product', createProduct)
router.put('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)

/* ******** DETAIL ROUTES ******** */

router.get('/details', getAllDetails)
router.get('/details/:id', getSingleDetail)
router.post('/details', updateDetails)
router.put('/detail/:id', updateDetail)
router.delete('/detail/:id', deleteDetail)

/* ******** ENQUIRY ROUTES ******** */

router.get('/enquiries', getAllEnquiries)
router.get('/enquiry/:id', getSingleEnquiry)
router.post('/enquiry', createEnquiry)
router.put('/enquiry/:id', updateEnquiry)
router.delete('/enquiry/:id', deleteEnquiry)

export default router