const express = require("express");
const { router } = require("./userRouter");

const app = express();

app.use(express.json());
app.use("/", router);

app.listen(3000, () => {
  console.log("Listening on 3000");
});
