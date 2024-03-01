const express = require("express");
const { body, validationResult } = require("express-validator");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Veuillez fournir une adresse email valide"),

    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Le mot de passe doit avoir 4 caractères"),
  ],

  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(({ path, msg }) => ({
          field: path,
          error_message: msg,
        }));

        const error = new Error("Echec de validation des données");
        error.statusCode = 422;
        error.data = formattedErrors;
        throw error;
      }

      await authController.login(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/register",
  [
    body("lastname")
      .trim()
      .notEmpty()
      .withMessage("Le champ lastname est requis"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Le champ email  est requis"),
    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Le champ password doit avoir au moins 4 caractères"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(({ path, msg }) => ({
          field: path,
          error_message: msg,
        }));

        const error = new Error("Echec de validation des données");
        error.statusCode = 422;
        error.data = formattedErrors;
        throw error;
      }

      await authController.register(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
