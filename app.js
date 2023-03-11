let express = require("express");
let dotenv = require("dotenv");

let connectDB = require("./db");
require('colors')

const logger = require("morgan");
const cors = require("cors");


const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");

const app = express()

// Load env variables
dotenv.config();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
// Connect DB
connectDB();


app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});


// Provide server
const { PORT, NODE_ENV } = process.env || 5050;

console.log(PORT)
app.listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.cyan.bold);
});


module.exports = app;





// const express = require("express");
// const logger = require("morgan");
// const cors = require("cors");
// require("dotenv").config();

// const contactsRouter = require("./routes/api/contacts");
// const authRouter = require("./routes/api/auth");





// app.use(logger(formatsLogger));
// app.use(cors());
// app.use(express.json());
// app.use(express.static("public"));

// app.use("/api/users", authRouter);
// app.use("/api/contacts", contactsRouter);

// app.use((req, res) => {
//   res.status(404).json({ message: "Not found" });
// });

// app.use((err, req, res, next) => {
//   const { status = 500, message = "Server error" } = err;
//   res.status(status).json({ message });
// });

