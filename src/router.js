import {Router} from "express";

import {createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct} from "./handlers/products.js";
import {createEnquiry, getAllEnquiries, getSingleEnquiry, updateEnquiry, deleteEnquiry} from "./handlers/enquiry.js";
import {createDetails, getAllDetails, getSingleDetails, updateDetails, deleteDetails} from "./handlers/smas.js";
const router = Router()

/* ******** PRODUCT ROUTES ******** */

router.get('/products', getAllProducts)
router.get('/product/:id', getSingleProduct)
router.post('/product', createProduct)
router.put('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)

/* ******** DETAIL ROUTES ******** */

router.get('/details', getAllDetails)
router.get('/details/:id', getSingleDetails)
router.post('/details', createDetails)
router.put('/details/:id', updateDetails)
router.delete('/detail/:id', deleteDetails)

/* ******** ENQUIRY ROUTES ******** */

router.get('/enquiries', getAllEnquiries)
router.get('/enquiry/:id', getSingleEnquiry)
router.post('/enquiry', createEnquiry)
router.put('/enquiry/:id', updateEnquiry)
router.delete('/enquiry/:id', deleteEnquiry)

export default router