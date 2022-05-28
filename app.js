const express = require("express");
const cors = require("cors");

const db = require("./Data/Database");

const app = express();

app.use("/api/public", express.static("./Public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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
