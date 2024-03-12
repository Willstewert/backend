const express = require("express");
const connectDb = require("./db/Config");
const cors = require("cors");

const router = require("./router/auth-router");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", router);
app.use("/register", router);
app.use("/user/:userId/book", router);
app.use("/login", router);
app.use("/getUsers", router);
app.use("/dele/:userId", router);
app.use("/update/:userId", router);

const PORT = 5000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listing on PORT : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error, `error in PORT : ${PORT}`);
  });
