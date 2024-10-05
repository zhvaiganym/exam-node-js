const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const usersRouter = require("./routers/usersRouter.js");
const coursesRouter = require("./routers/coursesRouter.js");

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/users", usersRouter);
app.use("/courses", coursesRouter);

app.listen(8080);