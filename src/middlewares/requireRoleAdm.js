/* Importing the User model from the UserModel.js file. */
import { User } from '../models/User.model.js';

/**
 * It checks if the user is an admin or not. If not, it throws an error.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - This is a function that you call when you want to pass control to the next middleware
 * function in the stack.
 * @returns the next() function.
 */
export const adminRole = async (req, res, next) => {
	try {
		/* Getting the user from the database. */
		const user = await User.findById(req.uid);
		/* Getting the role of the user. */
		const role = user.role;
		/* Throwing an error if the user is not an admin. */
		if(role === 'trabajador') throw new Error('No tiene permisos para hacer esta operacion');
		/* Checking if the user is an admin or not. If it is, it returns the next() function. */
		if(role === 'administrador') return next();
	} catch (error) {
		/* Logging the error and returning a response with the error message. */
		// console.log(error);
		return res.status(400).json({error: error.message});
	}
};