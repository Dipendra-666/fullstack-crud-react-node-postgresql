var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var adminRouter = require('./routes/admin');
var productRouter = require('./routes/product');
var categoryRouter = require('./routes/category');
var reportRouter = require('./routes/report');
var supplierRouter = require('./routes/supplier');
var purchaseRouter = require('./routes/purchase');
var userRouter = require('./routes/user');

var app = express();

/* ========================
   BASIC MIDDLEWARE
======================== */

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* ========================
   CORS CONFIGURATION
======================== */

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

/* ========================
   HEALTH & ROOT ROUTES
======================== */

// Health check for Docker
app.get('/health', (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is healthy"
  });
});

// Root route (prevents 404 on /)
app.get('/', (req, res) => {
  res.status(200).json({
    message: "API is running successfully 🚀"
  });
});

/* ========================
   API ROUTES
======================== */

app.use('/products', productRouter);
app.use('/category', categoryRouter);
app.use('/report', reportRouter);
app.use('/supplier', supplierRouter);
app.use('/purchase', purchaseRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);

/* ========================
   404 HANDLER
======================== */

app.use((req, res, next) => {
  next(createError(404, "Route Not Found"));
});

/* ========================
   ERROR HANDLER
======================== */

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

module.exports = app;