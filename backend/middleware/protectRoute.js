import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";

export const protectRoute = async (req, res, next) => {
	try {
		// IMPORTANT: cookies must be sent using axios with { withCredentials: true }
		const token = req.cookies["jwt-netflix"];

		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized - No Token Provided",
			});
		}

		// Verify token
		const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

		if (!decoded?.userId) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized - Invalid Token",
			});
		}

		// Fetch user
		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		req.user = user;
		next();
	} catch (error) {
		console.log("Error in protectRoute middleware:", error.message);

		// Handle expired token
		if (error.name === "TokenExpiredError") {
			return res.status(401).json({
				success: false,
				message: "Token expired",
			});
		}

		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};
