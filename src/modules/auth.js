import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
    return bcrypt.hash(password, 7);
};

export const createJWT = (user) => {
    const jwtToken = jwt.sign(
        {
            id: user.id,
            name: user.fullName,
            email: user.email,
        },
        process.env.SECRET_KEY,
    );
    return jwtToken;
};