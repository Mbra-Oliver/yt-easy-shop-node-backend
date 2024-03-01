const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const app = express();

const MONGO_DB_URL =
  "mongodb+srv://mbraoliver-dev:B6tL426reOCfZ1DU@cluster0.9rml5vv.mongodb.net/tutoriel_api";

app.use(bodyParser.json());
app.use(cors()); //Eviter les erreurs CORS

//routes
app.use("/auth", authRoutes);

//Gerer les erreurs global

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message;
  const data = err.data;

  res.json({
    statusCode,
    message,
    data,
  });
});

mongoose
  .connect(MONGO_DB_URL)
  .then((result) => {
    console.log("Nous sommes connecté");
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });

// npm i --save-dev @types/node
