const express = require("express");
const cors = require("cors");
const dotEnv = require("dotenv");
const db = require("./database/connection");
const router = require("./routes");

const app = express();
dotEnv.config();
db.connectDb();

router.routeConfig(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});

