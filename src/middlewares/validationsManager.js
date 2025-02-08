import { validationResult, body } from "express-validator";

export const validationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const bodyRegisterValidations = [
  body("name")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Debe escribir su nombre")
    .isLength({ min: 3 })
    .withMessage("Debe tener minimo 3 caracteres"),
  body("surname")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Debe escribir su apellido")
    .isLength({ min: 3 })
    .withMessage("Debe tener minimo 3 caracteres"),
  body("email", "Formato de email no valido").trim().isEmail().normalizeEmail(),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Debe tener minimo 6 caracteres"),
  body("password", "Contraseña invalida").custom((value, { req }) => {
    if (value !== req.body.repassword)
      throw new Error("No coinciden las contraseñas");
    return value;
  }),
  body("role", "Debe tener un rol asignado").trim().not().isEmpty().escape(),
  validationErrors,
];

export const bodyLoginValidations = [
  body("email", "Formato de email no valido").trim().isEmail().normalizeEmail(),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Debe tener minimo 6 caracteres"),
  validationErrors,
];

export const marketCreateValidations = [
  body("name")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Debe escribir el nombre del Marketplace")
    .isLength({ min: 3 })
    .withMessage("Debe tener minimo 3 caracteres"),
  body("market_type")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Debe escribir el tipo de Marketplace")
    .isLength({ min: 3 })
    .withMessage("Debe tener minimo 3 caracteres"),
  body("market_credentials.api_key")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Debe escribir la API Key del marketplace"),
  body("market_credentials.api_password")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Debe escribir la API Password del marketplace"),
  body("market_credentials.url_shop")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Debe escribir la url del marketplace"),
  body("market_credentials.api_version")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Debe escribir la version de la API"),
  validationErrors,
];

export const customerValidations = [
  body("customer_id")
    .not()
    .isEmpty()
    .withMessage("Se debe especificar el ID del cliente")
    .isInt()
    .withMessage("Debe ser una secuencia de números"),
  body("first_name")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Se debe especificar el primer nombre del cliente")
    .isLength({ min: 3 })
    .withMessage("Debe tener minimo 3 caracteres"),
  body("last_name")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Se debe especificar el primer apellido del cliente")
    .isLength({ min: 3 })
    .withMessage("Debe tener minimo 3 caracteres"),
  body("name")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Se debe especificar el nombre completo del cliente")
    .isLength({ min: 7 })
    .withMessage("Debe tener minimo 7 caracteres"),
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Formato de email no valido"),
  body("phone")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Se debe especificar el telefono del cliente")
    .isLength({ min: 10 })
    .withMessage("Debe tener minimo 10 caracteres"),
  body("events_history.user")
    .not()
    .isEmpty()
    .trim()
    .withMessage(
      "Se debe especificar el ID del usuario que crea la orden interna"
    )
    .isMongoId()
    .withMessage("Debe ser un ID de MongoDB"),
  validationErrors,
];
