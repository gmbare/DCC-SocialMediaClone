require("dotenv").config();
const connectDb = require("./db/db");
const usersRouter = require("./routes/users");
<<<<<<< HEAD
const postsRouter = require("./routes/posts");
const aboutsRouter = require("./routes/abouts.js");
=======
const aboutsRouter = require("./routes/aboutMe.js");
const postsRouter = require("./routes/posts");
>>>>>>> fd7fe75184905415a5b959d05608cc45c83772c0
const express = require("express");
const cors = require("cors");
const app = express();

connectDb();

app.use(cors());
app.use(express.json());
app.use(`/api/users`, usersRouter);
<<<<<<< HEAD
app.use(`/api/posts`, postsRouter);
app.use(`/api/abouts`, aboutsRouter);
=======
app.use(`/api/abouts`, aboutsRouter);
app.use(`/api/posts`, postsRouter);
>>>>>>> fd7fe75184905415a5b959d05608cc45c83772c0

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
