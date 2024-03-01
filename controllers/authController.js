const User = require("./../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Echec de la validation des données");
    error.statusCode = 422;
    error.data = errors.array();

    throw error;
  }

  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  const userAlreadyRegistered = await User.findOne({ email });

  if (userAlreadyRegistered) {
    const error = new Error("Cette adresse email est déja utilisée");
    error.statusCode = 422;
    error.data = "Email already used !";
    throw error;
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new User({
      lastname,
      email,
      password: passwordHash,
    });

    const result = await newUser.save();

    res.status(200).json({
      statusCode: 201,
      message: "Votre compte a été créer",
      userId: result._id,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Echec de la validation des données");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const password = req.body.password;

  try {
    const userExist = await User.findOne({ email });

    if (!userExist) {
      const error = new Error("Compte non reconnu");
      error.statusCode = 401;
      error.data = "This account is unknow !";
      throw error;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExist.password
    );

    if (!isPasswordCorrect) {
      const error = new Error("Le mot de passe saisi est incorrect");
      error.statusCode = 401;
      error.data = "The password is incorrect";
      throw error;
    }

    const token = jwt.sign(
      {
        email: userExist.email,
        userId: userExist._id.toString(),
      },
      "secret_keyword_or_phrase",
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      statusCode: 200,
      message: "Connexion éffectuée",
      token,
      userId: userExist._id.toString(),
      data: userExist,
    });
  } catch (error) {
    next(error);
  }
};
