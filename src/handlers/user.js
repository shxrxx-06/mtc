import prisma from "../db.js";
import logger from "../modules/logger.js";

import {
    comparePassword,
    hashPassword,
    createJWT,
} from "../modules/auth.js";

export const createUser = async (req, res) => {
    logger.info(req.body)
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        })

        if(existingUser) {
            return res.status(400).json({error: "User already exists"})
        }

        const user = await prisma.user.create({
            data: {
                fullName: req.body.fullName,
                email: req.body.email,
                password: await hashPassword(req.body.password)
            }
        })
        return res.status(200).json({user})
    } catch (err) {
        logger.error(err);
        return res.status(500).json({error: "Internal Server Error"});
    }
}
export const userLogin = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        })

        if (!user) {
            logger.info("user not found", req.body);
            return res.status(404).json({error: "Incorrect mail id"});
        }

        const isPasswordValid = await comparePassword(
            req.body.password,
            user.password,
        );

        if (isPasswordValid) {
            logger.info("Admin successfully logged in");
            const token = createJWT(user);
            return res.json({token});
        } else {
            return res.status(401).json({error: "incorrect password"});
        }
    } catch (err) {
        logger.error(err)
        return res.status(500).json({error: "Internal Server Error"});
    }
};