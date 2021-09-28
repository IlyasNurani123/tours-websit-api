const express = require("express");
const cors = require("cors");
const dotEnv = require("dotenv");
const db = require("./database/dbConfig/connection");
const router = require("./routes");

const app = express();
dotEnv.config();
db.connectDb();

app.use(cors());
//require payload middleware
app.use(express.json());
app.use(express.urlencoded());

router.config(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    status: 500,
    message: err.message,
    body: {},
  });
});
