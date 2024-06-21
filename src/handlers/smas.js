import prisma from "../db.js";
import logger from "../modules/logger.js";

// Create Details

export const updateDetails = async (req, res) => {
    logger.info(req.body)
    try {
        // const { SCODE, NSCODE, TYPE, NAME, NAME1, ADD1, ADD2, ADD3, ADD4, PINCODE, STATE, STDCODE, PHONE1, PHONE2, PHONE3, FAX, TELEX, VFROM, VTO, ASRTUREF, ASRTUDT, VENRATE, ACODE, TINNO, PANNO, GSTIN, MSMENO, STYP, UPDDATE, BANKNAME, ACNO, IFSCCODE, BNKENTYDAT, CORRDATE } = req.body;
        const details = await prisma.sMAS.create({
            data: req.body
            // data: {
            //     SCODE,
            //     NSCODE,
            //     TYPE,
            //     NAME,
            //     NAME1,
            //     ADD1,
            //     ADD2,
            //     ADD3,
            //     ADD4,
            //     PINCODE,
            //     STATE,
            //     STCODE,
            //     PHONE1,
            //     PHONE2,
            //     PHONE3,
            //     PHONE4,
            //     FAX,
            //     TELEX,
            //     VFROM,
            //     VTO,
            //     ASRTUREF,
            //     VENRATE,
            //     ACODE,
            //     TINNO,
            //     PANNO,
            //     GSTIN,
            //     MSMEN,
            //     STYP,
            //     UPDDATE,
            //     BANKNAME,
            //     ACNO,
            //     IFSCCODE,
            //     BNKENTYDAT,
            //     CORRDATE
            // }
        })
        logger.info('Details added successfully')
        return res.status(200).json({data: details})
    } catch (err) {
        logger.error(err)
        return res.status(400).json("Error adding in details")
    }
}

// Get all Details

export const getAllDetails = async (req, res) => {
    try {
        const details = await prisma.sMAS.findMany({
            orderBy: {
                SCODE: 'asc'
            }
        })

        if(details.length === 0) {
            return res.status(404).json({msg: 'No details found'})
        }

        return res.status(200).json({data: details})

    } catch (err) {
        logger.error('Error caught in get all company details handler', err)
        return res.status(400).json("Failed to get all company details")
    }
}

// Get single detail

export const getSingleDetail = async (req, res) => {
    try {
        const details = await prisma.sMAS.findUnique({
            where: {
                id: req.params.id
            }
        })

        if(!details) {
            return res.status(404).json("Details not found")
        }

        return res.status(200).json({data: details})

    } catch (err) {
        logger.error('Error caught in get single company detail handler')
        return res.status(400).json("Failed to get company details")
    }
}

// Update detail

export const updateDetail = async (req, res) => {
    try {

        const id = req.params.id

        const detail = await prisma.sMAS.findUnique({
            where: {
                id
            }
        })

        if(!detail) {
            return res.status(404).json("Detail not found")
        }

        const updateDetail = await prisma.sMAS.update({
            where: {
                id
            },
            data: req.body
        })

        return res.json({data: updateDetail})

    } catch (err) {
        logger.error('Error caught in update details handler', err)
        return res.status(400).json("Failed to update company detail")
    }
}

export const deleteDetail = async (req, res) => {
    try {
        const id = req.params.id

        const detail = await prisma.sMAS.findUnique({
            where: {
                id
            }
        })

        if(!detail) {
            return res.status(404).json("Detail not found")
        }

        const data = await prisma.sMAS.delete({
            where: {
                id
            }
        })

        return res.status(200).json({data, msg: "Details deleted"})

    } catch (err) {
        logger.error('Error caught in delete company details handler', err)
        return res.status(400).json("Failed to delete company details")
    }
}
