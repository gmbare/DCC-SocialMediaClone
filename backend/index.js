require("dotenv").config();
const connectDb = require("./db/db");
const usersRouter = require("./routes/users");
const aboutsRouter = require("./routes/aboutMe.js");
const express = require("express");
const cors = require("cors");
const app = express();

connectDb();

app.use(cors());
app.use(express.json());
app.use(`/api/users`, usersRouter);
app.use(`/api/abouts`, aboutsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
