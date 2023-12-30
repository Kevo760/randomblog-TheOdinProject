var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

var indexRouter = require('./routes/index');
const postRouter = require('./routes/postRoute');
const userRouter = require('./routes/userRoute');
const commentRouter = require('./routes/commentRoute');

var app = express();
const PORT = process.env.PORT || 4000;

// Set up mongoose connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(async() => {
      console.log('Connection successful');
      app.listen(PORT, () => console.log(`Server is running`));
    })
  } catch(err) {
    console.log(err);
  }
};

connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/comment', commentRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
