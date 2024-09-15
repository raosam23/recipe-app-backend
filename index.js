const express = require("express");
const cors = require("cors");
const router = require("./routes/searchRecipe");

const app = express();

const port = 8000;

app.use(cors());

app.use("/routes", router);

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
