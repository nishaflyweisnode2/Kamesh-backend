const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
// const Seller = require("../Models/sellerModel");
const dotenv = require("dotenv");
// dotenv.config({ path: "configs/config.env" });
// const ErrorHander = require("../utils/errorhander");
const verifyToken = (req, res, next) => {
    const token =
        req.get("Authorization")?.split("Bearer ")[1] ||
        req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "no token provided! Access prohibited",
        });
    }

    jwt.verify(token, "node5flyweis", async (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).send({
                message: "UnAuthorised !",
            });
        }
        const user = await User.findOne({ _id: decoded.id });
        const user1 = await User.findOne({ _id: decoded.id });
        if (!user && !user1) {
            return res.status(400).send({
                message: "The user that this token belongs to does not exist",
            });
        }
        req.user = user || user1;
        //console.log(user);
        next();
    });
};
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHander(
                    `Role: ${req.user.role} is not allowed to access this resouce `,
                    403
                )
            );
        }

        next();
    };
};
const isAdmin = (req, res, next) => {
    const token =
        req.headers["x-access-token"] ||
        req.get("Authorization")?.split("Bearer ")[1];

    if (!token) {
        return res.status(403).send({
            message: "No token provided! Access prohibited",
        });
    }

    jwt.verify(token, "node5flyweis", async (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized! Admin role is required!",
            });
        }

        try {
            const user = await User.findOne({ _id: decoded.id });

            if (!user) {
                return res.status(400).send({
                    message: "The admin that this  token belongs to does not exist",
                });
            }

            if (user.role !== "admin") {
                return res.status(403).send({
                    message: "Access prohibited. Admin role is required!",
                });
            }

            req.user = user;
            next();
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    });
};

module.exports = {
    verifyToken,
    authorizeRoles,
    isAdmin,
};