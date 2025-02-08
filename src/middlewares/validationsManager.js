/* Importing the validationResult and body from express-validator. */
import { validationResult, body } from 'express-validator';


/**
 * If there are errors, return a 400 status code and the errors array. Otherwise, move on to the next
 * middleware.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - This is a callback function that is called when the middleware is complete.
 * @returns The errors object is being returned.
 */
export const validationErrors = (req, res, next) => {
	/* Checking if there are any errors in the request. */
	const errors = validationResult(req);
	/* Checking if there are any errors in the request. If there are, it returns a 400 status code and the
    errors array. Otherwise, it moves on to the next middleware. */
	if(!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array()});
	}

	/* Calling the next middleware. */
	next();
};

/* An array of validations. */
export const bodyRegisterValidations = [
	/* Checking if the name field is empty. */
	body('name')
		.not().isEmpty().trim().escape()
		.withMessage('Debe escribir su nombre')
		.isLength({min: 3})
		.withMessage('Debe tener minimo 3 caracteres'),
	/* Checking if the surname field is empty. */
	body('last_name')
		.not().isEmpty().trim().escape()
		.withMessage('Debe escribir su apellido')
		.isLength({min: 3})
		.withMessage('Debe tener minimo 3 caracteres'),
	/* Checking if the email field is empty. If it is, it returns a 400 status code and the errors array.
    Otherwise, it moves on to the next middleware. */
	body('email', 'Formato de email no valido').trim().isEmail().normalizeEmail(),
	/* Checking if the password field is empty. */
	body('password')
		.trim().isLength({min: 6})
		.withMessage('Debe tener minimo 6 caracteres'),
	/* Checking if the password field is empty. */
	body('password', 'Contraseña invalida')
		.custom((value, {req}) => {
			if(value !== req.body.repassword) throw new Error('No coinciden las contraseñas');
			return value;
		}),
	/* Checking if the role field is empty. If it is, it returns a 400 status code and the errors array.
    Otherwise, it moves on to the next middleware. */
	body('role', 'Debe tener un rol asignado').trim().not().isEmpty().escape(),
	body('phone', 'Debe tener un telefono asignado').trim().not().isEmpty(),
	body('profession', 'Debe tener una profesión asignada').trim().not().isEmpty(),
	body('gender', 'Debe tener una género asignado').trim().not().isEmpty(),
	/* A middleware that is being called in the bodyRegisterValidations and bodyLoginValidations arrays. */
	validationErrors
];


/* An array of validations. */
export const bodyLoginValidations = [
	/* Checking if the email field is empty. If it is, it returns a 400 status code and the errors array.
    Otherwise, it moves on to the next middleware. */
	body('email', 'Formato de email no valido').trim().isEmail().normalizeEmail(),
	/* Checking if the password field is empty. */
	body('password')
		.trim().isLength({min: 6})
		.withMessage('Debe tener minimo 6 caracteres'),
	/* A middleware that is being called in the bodyRegisterValidations and bodyLoginValidations arrays. */
	validationErrors
];

/* An array of validations. */
export const marketCreateValidations = [
	/* Checking if the name field is empty. If it is, it returns a 400 status code and the errors array.
	Otherwise, it moves on to the next middleware. */
	body('name')
		.not().isEmpty().trim().escape()
		.withMessage('Debe escribir el nombre del Marketplace')
		.isLength({min: 3})
		.withMessage('Debe tener minimo 3 caracteres'),
	body('market_type')
		.not().isEmpty().trim().escape()
		.withMessage('Debe escribir el tipo de Marketplace')
		.isLength({min: 3})
		.withMessage('Debe tener minimo 3 caracteres'),
	body('market_credentials.api_key')
		.not().isEmpty().trim().escape()
		.withMessage('Debe escribir la API Key del marketplace'),
	body('market_credentials.api_password')
		.not().isEmpty().trim().escape()
		.withMessage('Debe escribir la API Password del marketplace'),
	body('market_credentials.url_shop')
		.not().isEmpty().trim().escape()
		.withMessage('Debe escribir la url del marketplace'),
	body('market_credentials.api_version')
		.not().isEmpty().trim().escape()
		.withMessage('Debe escribir la version de la API'),
	/* A middleware that is being called in the bodyRegisterValidations and bodyLoginValidations arrays. */
	validationErrors
];

/* Validating the body of the request. */
export const internalOrdersValidations = [
	/* Validating the request body. */
	body('order_id')
		.not().isEmpty().trim().escape()
		.withMessage('Se debe especificar el ID de la orden'),
	body('order_name')
		.not().isEmpty().trim().escape()
		.withMessage('Se debe especificar el nombre de la orden')
		.isLength({min: 3})
		.withMessage('El nombre debe contener minimo 6 caracteres'),
	body('skus')
		.isArray()
		.withMessage('Debe ser un arreglo de skus'),
	body('carrier_company')
		.not().isEmpty().trim().escape()
		.withMessage('Se debe especificar el nombre de la compañia de carrier')
		.isLength({min: 3})
		.withMessage('Debe tener minimo 3 caracteres'),
	body('tracking_number')
		.not().isEmpty().trim().escape()
		.withMessage('Se debe especificar el numero de rastreo del envio'),
	body('shipment_status')
		.not().isEmpty().trim().escape()
		.withMessage('Se debe especificar el estado del envio'),
	body('label')
		.not().isEmpty().trim().escape()
		.withMessage('Se debe especificar el ID del label generado')
		.isMongoId()
		.withMessage('Debe ser un ID de MongoDB'),
	body('related_urls.order_status_url')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar la url de la orden')
		.isURL({ protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, require_host: true, require_port: false, require_valid_protocol: true, allow_underscores: true, host_whitelist: false, host_blacklist: false, allow_trailing_dot: true, allow_protocol_relative_urls: true, allow_fragments: true, allow_query_components: true, disallow_auth: false, validate_length: true })
		.withMessage('Debe tener formato de url, EX: https://www.google.com/'),
	body('related_urls.trackingUrl')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar la url del rastreo del envio')
		.isURL({ protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, require_host: true, require_port: false, require_valid_protocol: true, allow_underscores: true, host_whitelist: false, host_blacklist: false, allow_trailing_dot: true, allow_protocol_relative_urls: true, allow_fragments: true, allow_query_components: true, disallow_auth: false, validate_length: true })
		.withMessage('Debe tener formato de url, EX: https://www.google.com/'),
	body('origin_address.country_code')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar el código del país de origen'),
	body('origin_address.name')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar el nombre del vendedor'),
	body('origin_address.address1')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar la dirección de origen 1'),
	body('origin_address.city')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar la ciudad de origen'),
	body('origin_address.zip')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar el código postal de la dirección de origen'),
	body('shipping_address.address1')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar la dirección de envio 1'),
	body('shipping_address.city')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar la ciudad de envio'),
	body('shipping_address.zip')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar el código postal de la dirección de envio'),
	body('shipping_address.province')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar el estado de envio'),
	body('shipping_address.province_code')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar el código del estado de envio'),
	body('shipping_address.country')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar el país de envio'),
	body('shipping_address.country_code')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar el código del país de envio'),
	body('shipping_address.company')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar la compañia del cliente'),
	body('shipping_address.name')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar el nombre completo del cliente'),
	body('shipping_address.latitude')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar la latitude de la dirección de envio'),
	body('shipping_address.longitude')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar la longitud de la dirección de envio'),
	body('customer_info.first_name')
		.not().isEmpty().trim().escape()
		.withMessage('Se debe especificar el primer nombre del cliente')
		.isLength({min: 3})
		.withMessage('Debe tener minimo 3 caracteres'),
	body('customer_info.last_name')
		.not().isEmpty().trim().escape()
		.withMessage('Se debe especificar el primer apellido del cliente')
		.isLength({min: 3})
		.withMessage('Debe tener minimo 3 caracteres'),
	body('customer_info.name')
		.not().isEmpty().trim().escape()
		.withMessage('Se debe especificar el nombre completo del cliente')
		.isLength({min: 7})
		.withMessage('Debe tener minimo 7 caracteres'),
	body('customer_info.email')
		.trim().isEmail().normalizeEmail()
		.withMessage('Formato de email no valido'),
	body('customer_info.phone')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar el telefono del cliente')
		.isLength({min: 10})
		.withMessage('Debe tener minimo 10 caracteres'),
	body('customer_info.customer_id')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar el ID del cliente')
		.isInt()
		.withMessage('Debe ser una secuencia de números'),
	body('events_history.package_delivery')
		.isBoolean()
		.withMessage('Debe ser true o false'),
	body('events_history.user')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar el ID del usuario que crea la orden interna')
		.isMongoId()
		.withMessage('Debe ser un ID de MongoDB'),
	/* A middleware that is being called in the bodyRegisterValidations and bodyLoginValidations arrays. */
	validationErrors
];

/* Validating the body of the request. */
export const updateInternalOrderValidation = [
	/* Validating the request body. */
	body('carrier_company')
		.not().isEmpty().trim().escape()
		.withMessage('Se debe especificar el nombre de la compañia de carrier')
		.isLength({min: 3})
		.withMessage('Debe tener minimo 3 caracteres'),
	body('tracking_number')
		.not().isEmpty().trim().escape()
		.withMessage('Se debe especificar el numero de rastreo del envio'),
	body('shipment_status')
		.not().isEmpty().trim().escape()
		.withMessage('Se debe especificar el estado del envio'),
	body('label')
		.not().isEmpty().trim().escape()
		.withMessage('Se debe especificar el ID del label generado')
		.isMongoId()
		.withMessage('Debe ser un ID de MongoDB'),
	body('related_urls.trackingUrl')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar la url del rastreo del envio')
		.isURL({ protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, require_host: true, require_port: false, require_valid_protocol: true, allow_underscores: true, host_whitelist: false, host_blacklist: false, allow_trailing_dot: true, allow_protocol_relative_urls: true, allow_fragments: true, allow_query_components: true, disallow_auth: false, validate_length: true })
		.withMessage('Debe tener formato de url, EX: https://www.google.com/'),
	body('related_urls.trackingUrl'),
	body('events_history.order_updated_at.date')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar la fecha de creación de la orden interna'),
	body('events_history.package_delivery')
		.isBoolean()
		.withMessage('Debe ser true o false'),
	body('events_history.order_updated_at.user')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar el ID del usuario que crea la orden interna')
		.isMongoId()
		.withMessage('Debe ser un ID de MongoDB'),
	/* A middleware that is being called in the bodyRegisterValidations and bodyLoginValidations arrays. */
	validationErrors
];

/* Validating the body of the request. */
export const internalLabelValidations = [
	body('image_format')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar el formato de imagen'),
	body('content')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar el contenido de la etiqueta')
		.isBase64()
		.withMessage('El contenido debe estar en formato base64 encoded PDF'),
	body('type_code')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar el tipo de documento (Label)'),
	body('order.order_id')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar el ID de la orden'),
	body('order.order_name')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar el nombre de la orden')
		.isLength({min: 3})
		.withMessage('El nombre debe contener minimo 6 caracteres'),
	body('shipment.tracking_number')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar el numero de rastreo del envio'),
	body('shipment.tracking_url')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar la url del rastreo del envio')
		.isURL({ protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, require_host: true, require_port: false, require_valid_protocol: true, allow_underscores: true, host_whitelist: false, host_blacklist: false, allow_trailing_dot: true, allow_protocol_relative_urls: true, allow_fragments: true, allow_query_components: true, disallow_auth: false, validate_length: true })
		.withMessage('Debe tener formato de url, EX: https://www.google.com/'),
	body('events_history.user')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar el ID del usuario que crea la orden interna')
		.isMongoId()
		.withMessage('Debe ser un ID de MongoDB'),
	/* A middleware that is being called in the bodyRegisterValidations and bodyLoginValidations arrays. */
	validationErrors
];

export const customerValidations = [
	/* Validating the customer_id field. */
	body('customer_id')
		.not().isEmpty()
		.withMessage('Se debe especificar el ID del cliente')
		.isInt()
		.withMessage('Debe ser una secuencia de números'),
	body('first_name')
		.not().isEmpty().trim().escape()
		.withMessage('Se debe especificar el primer nombre del cliente')
		.isLength({min: 3})
		.withMessage('Debe tener minimo 3 caracteres'),
	body('last_name')
		.not().isEmpty().trim().escape()
		.withMessage('Se debe especificar el primer apellido del cliente')
		.isLength({min: 3})
		.withMessage('Debe tener minimo 3 caracteres'),
	body('name')
		.not().isEmpty().trim().escape()
		.withMessage('Se debe especificar el nombre completo del cliente')
		.isLength({min: 7})
		.withMessage('Debe tener minimo 7 caracteres'),
	body('email')
		.trim().isEmail().normalizeEmail()
		.withMessage('Formato de email no valido'),
	body('phone')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar el telefono del cliente')
		.isLength({min: 10})
		.withMessage('Debe tener minimo 10 caracteres'),
	body('events_history.user')
		.not().isEmpty().trim()
		.withMessage('Se debe especificar el ID del usuario que crea la orden interna')
		.isMongoId()
		.withMessage('Debe ser un ID de MongoDB'),
	/* A middleware that is being called in the bodyRegisterValidations and bodyLoginValidations arrays. */
	validationErrors
];