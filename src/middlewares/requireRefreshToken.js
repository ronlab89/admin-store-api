/* Importing the jwt library and the tokenVerificationErrors object from the tokenManager.js file. */
import jwt from 'jsonwebtoken';
import { tokenVerificationErrors } from '../utils/tokenManager.js';

/**
 * It checks if the user has a refresh token cookie, if it does, it verifies it and if it's valid, it
 * adds the user id to the request object and calls the next middleware.
 * 
 * If the user doesn't have a refresh token cookie, it throws an error.
 * 
 * If the refresh token cookie is invalid, it throws an error.
 * 
 * If the refresh token cookie is valid, it adds the user id to the request object and calls the next
 * middleware.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - A function to be called to invoke the next middleware function in the stack.
 * @returns a function that is being used as middleware.
 */
export const requireRefreshToken = (req, res, next) => {
	try {
		/* It's getting the refresh token cookie from the request object. */
		let tokenRefreshCookie = req.cookies?.refreshToken;
		/* It's checking if the user has a refresh token cookie, if it doesn't, it throws an error. */
		if(!tokenRefreshCookie) throw new Error('No existe el token');
		/* It's getting the user id from the refresh token cookie. */
		const {uid} = jwt.verify(tokenRefreshCookie, process.env.JWT_REFRESH);
		/* It's adding the user id to the request object. */
		req.uid = uid;
		/* It's calling the next middleware function in the stack. */
		next();
	} catch (error) {
		/* It's logging the error and returning a 401 status code with the error message. */
		// console.log(error);
		return res.status(401).send({error: tokenVerificationErrors[error.message]});
	}
};