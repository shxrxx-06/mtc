import prisma from "../db.js";
import logger from "../modules/logger.js";

export const createEnquiry = async (req, res) => {
    try {
        const enquiry = await prisma.enquiry.create({
            data: req.body
        })
        logger.info('Enquiry has raised successfully')
        return res.status(200).json({data: enquiry})
    } catch (err) {
        logger.error(err)
        return res.status(500).json("Failed to create a enquiry")
    }
}

export const getAllEnquiries = async (req, res) => {
    try {
        const enquiries = await prisma.enquiry.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                IMAS: true
            }
        })

        if(enquiries.length === 0) {
            return res.status(404).json({msg: 'No previous enquiries found'})
        }

        return res.status(200).json({data: enquiries})

    } catch (err) {
        logger.error(err)
        return res.status(500).json("Failed to fetch all enquiries")
    }
}

export const getSingleEnquiry = async (req, res) => {
    try {
        const enquiry = await prisma.enquiry.findUnique({
            where: {
                id: req.params.id
            }
        })

        if(!enquiry) {
            return res.status(404).json('Enquiry not found')
        }

        return res.status(200).json({data: enquiry})

    } catch (err) {
        logger.error('Error caught in get single enquiry handler')
        return res.status(500).json("Failed to get enquiry")
    }
}

export const updateEnquiry = async (req, res) => {
    try {
        const id = req.params.id

        const query = await prisma.enquiry.findUnique({
            where: {
                id
            }
        })

        if(!query) {
            return res.status(404).json('Enquiry not found')
        }

        const updatedQuery = await prisma.enquiry.update({
            where: {
                id
            },
            data: req.body
        })

        return res.json({data: updatedQuery})

    } catch (err) {
        logger.error('Error caught in get single enquiry handler')
        return res.status(400).json("Failed to update enquiry")
    }
}

export const deleteEnquiry = async (req, res) => {
    try {
        const id = req.params.id

        const query = await prisma.enquiry.findUnique({
            where: {
                id
            }
        })

        if(!query) {
            return res.status(404).json('Enquiry not found')
        }

        const data = await prisma.enquiry.delete({
            where: {
                id
            }
        })

        return res.status(200).json({data, msg: "Enquiry deleted"})

    } catch (err) {
        logger.error('Error caught in delete enquiry handler', err)
        return res.status(500).json("Failed to delete enquiry")
    }
}