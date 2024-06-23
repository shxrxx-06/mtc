import prisma from "../db.js";
import logger from "../modules/logger.js";

export const getAllDetails = async (req, res) => {
    try {
      const details = await prisma.sMAS.findMany();
      return res.status(200).json({ data: details });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

//create details
export const createDetails = async (req, res) => {
    try {
        const { name, age, email } = req.body;
        const details = await prisma.sMAS.create({
            data: {
                name,
                age,
                email
            }
        });
        return res.status(201).json({ data: details });
    } catch (err) {
        logger.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

//delete details
export const deleteDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const details = await prisma.sMAS.delete({
            where: {
                id
            }
        });
        return res.status(200).json({ data: details });
    } catch (err) {
        logger.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

//get single details
export const getSingleDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const details = await prisma.sMAS.findUnique({
            where: {
                id
            }
        });
        if (!details) {
            return res.status(404).json({ error: "Details not found" });
        }
        return res.status(200).json({ data: details });
    } catch (err) {
        logger.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

//update details
export const updateDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, email } = req.body;
        const details = await prisma.sMAS.update({
            where: {
                id
            },
            data: {
                name,
                age,
                email
            }
        });
        if (!details) {
            return res.status(404).json({ error: "Details not found" });
        }
        return res.status(200).json({ data: details });
    } catch (err) {
        logger.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}