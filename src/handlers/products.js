import prisma from "../db.js";
import logger from "../modules/logger.js";

// Create Product

export const createProduct = async (req, res) => {
    logger.info(req.body)
    try {
        // const { ICODE, NICODE, GROUP, DESC1, DESC2, DESC3, UOM, OUOM, ASRTUNO, PARTNO, CALPUR, MAXSTK, MINSTK, ABC, VED, FMS, REORD, VITAL, AFOL, FOL, TYPE, HSN } = req.body;
        const product = await prisma.iMAS.create({
            data: req.body
            // data: {
            //     ICODE,
            //     NICODE,
            //     GROUP,
            //     DESC1,
            //     DESC2,
            //     DESC3,
            //     UOM,
            //     OUOM,
            //     ASRTUNO,
            //     PARTNO,
            //     CALPUR,
            //     MAXSTK,
            //     MINSTK,
            //     ABC,
            //     VED,
            //     FMS,
            //     REORD,
            //     VITAL,
            //     AFOL,
            //     FOL,
            //     TYPE,
            //     HSN
            // }
        })
        logger.info('Product created successfully')
        return res.status(200).json({data: product})
    } catch (err) {
        logger.error(err)
        return res.status(400).json("Error creating in product")
    }
}

// Get all products

export const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.iMAS.findMany({
            orderBy: {
                ICODE: 'asc'
            }
        })

        if(products.length === 0) {
            return res.status(404).json({msg: 'No products found'})
        }

        return res.status(200).json({data: products})

    } catch (err) {
        logger.error('Error caught in get all products handler', err)
        return res.status(400).json("Failed to get all products")
    }
}

// Get single product

export const getSingleProduct = async (req, res) => {
    try {
        const product = await prisma.iMAS.findUnique({
            where: {
                id: req.params.id
            }
        })

        if(!product) {
            return res.status(404).json("Product not found")
        }

        return res.status(200).json({data: product})

    } catch (err) {
        logger.error('Error caught in get single product handler')
        return res.status(400).json("Failed to get product")
    }
}

// Update product

export const updateProduct = async (req, res) => {
    try {

        const id = req.params.id

        const product = await prisma.iMAS.findUnique({
            where: {
                id
            }
        })

        if(!product) {
            return res.status(404).json("Product not found")
        }

        const updateProduct = await prisma.iMAS.update({
            where: {
                id
            },
            data: req.body
        })

        return res.json({data: updateProduct})

    } catch (err) {
        logger.error('Error caught in update product handler', err)
        return res.status(400).json("Failed to update product")
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id

        const product = await prisma.iMAS.findUnique({
            where: {
                id
            }
        })

        if(!product) {
            return res.status(404).json("Product not found")
        }

        const data = await prisma.iMAS.delete({
            where: {
                id
            }
        })

        return res.status(200).json({data, msg: "Product deleted"})

    } catch (err) {
        logger.error('Error caught in delete product handler', err)
        return res.status(400).json("Failed to delete product")
    }
}
