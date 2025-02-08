/* Importing the jsonwebtoken library and the tokenVerificationErrors object from the tokenManager.js
file. */
import jwt from 'jsonwebtoken';
import { tokenVerificationErrors } from '../utils/tokenManager.js';

/**
 * It takes a request, checks if the request has a header called authorization, if it does, it splits
 * the header into an array, takes the second element of the array, verifies the token, and if it's
 * valid, it adds the uid to the request object.
 * 
 * If the token is not valid, it returns a 401 error.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - This is a function that you call when you want to pass control to the next middleware
 * function in the stack.
 */
export const requireToken = (req, res, next) => {
	try {
		/* It's checking if the request has a header called authorization. */
		let token = req.headers?.authorization;
		/* It's checking if the request has a header called authorization. */
		if(!token) throw new Error('No existe el token en el header, usa Bearer');	
		/* It's splitting the token into an array, and taking the second element of the array. */
		token = token.split(' ')[1];
		/* It's destructuring the uid from the object that the verify method returns. */
		const {uid} = jwt.verify(token, process.env.JWT_SECRET);
		/* It's adding the uid to the request object. */
		req.uid = uid;
		/* It's passing control to the next middleware function in the stack. */
		next();
	} catch (error) {
		/* It's logging the error to the console, and returning a 401 error with a message. */
		// console.log(error);
		res.status(401).json({error: tokenVerificationErrors[error.message]});
	}
};