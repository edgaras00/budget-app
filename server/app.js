const express = require("express");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");

const userRouter = require("./api/routes/userRouter");
const transactionRouter = require("./api/routes/transactionRoute");
const categoryRouter = require("./api/routes/categoryRouter");
const accountRouter = require("./api/routes/accountRouter");

const errorController = require("./api/controllers/errorController");

const AppError = require("./utils/appError");

require("dotenv").config();

const app = express();

// Global middlewares
// Handle CORS
app.use(cors());

// Security HTTP headers
app.use(helmet());

// Rate limiter to limit /user requests from same IP address
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message:
    "Too many requests from this IP address. Please try again in an hour.",
});
app.use("/api/user", limiter);
// Body parser (body --> req.body)
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Data sanitization against XSS-attacks
app.use(xss());

app.use("/api/user", userRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/category", categoryRouter);
app.use("/api/account", accountRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorController);

module.exports = app;
