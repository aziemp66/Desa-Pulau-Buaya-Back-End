const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const db = require("./Data/Database");

const authRoutes = require("./Router/Auth.routes");
const adminRoutes = require("./Router/Admin.routes");

const errorHandlerMiddleware = require("./Middlewares/ErrorHandler");

const app = express();

dotenv.config();

app.use("/api/public", express.static("./Public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

db.connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
