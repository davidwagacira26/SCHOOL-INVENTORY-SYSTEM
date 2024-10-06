var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var socketIo = require('socket.io');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
var InventoryItem = require('./models/InventoryItem');
const CheckoutRecord = require('./models/CheckoutRecord');
const Student = require('./models/Student');
const { Op } = require('sequelize');
var Sequelize = require('./database');

var app = express();

var signupRouter = require('./routes/signup');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dashboardRouter = require('./routes/dashboard');
var checkinRouter = require('./routes/checkin');
var reportsRouter = require('./routes/reports');
var checkoutRouter = require('./routes/checkout');
var textbooksRouter = require('./routes/textbooks');
var checkedoutRouter = require('./routes/checkedout');
var isAuthenticated = require('./routes/authMiddleware');
var barcodescanRouter = require('./routes/barcodescan');
var inventoryupdateRouter = require('./routes/inventoryupdate');
var inventorystatusRouter = require('./routes/inventorystatus');
var usermanagementRouter = require('./routes/usermanagement');
var checkinremindersRouter = require('./routes/checkinreminders');
var profileRouter = require('./routes/profile');
var dashboard1Router = require('./routes/dashboard1');
var lowstocksRouter = require('./routes/lowstocks');
var overdueRouter = require('./routes/overdue');
var updateRouter = require('./routes/update');
var textbooksRouter = require('./routes/textbooks');
var availableitemsRouter = require('./routes/availableitems');
var textbook1Router = require('./routes/textbook List/textbook1');
var textbook2Router = require('./routes/textbook List/textbook2');
var textbook3Router = require('./routes/textbook List/textbook3');
var textbook4Router = require('./routes/textbook List/textbook4');
var textbook5Router = require('./routes/textbook List/textbook5');
var textbook6Router = require('./routes/textbook List/textbook6');
var textbook7Router = require('./routes/textbook List/textbook7');
var textbook8Router = require('./routes/textbook List/textbook8');
var textbook9Router = require('./routes/textbook List/textbook9');
var textbook10Router = require('./routes/textbook List/textbook10');
var textbook11Router = require('./routes/textbook List/textbook11');
var textbook12Router = require('./routes/textbook List/textbook12');

var server = http.createServer(app);
var io = socketIo(server);
app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', function(socket) {
  console.log('A user connected');
});

app.locals.io = io;


app.use(session({
  secret: 'webslesson',
  resave: true,
  saveUninitialized: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/',  indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/checkin', checkinRouter);
app.use('/reports', reportsRouter);
app.use('/dashboard', isAuthenticated, dashboardRouter);
app.use('/checkin', isAuthenticated, checkinRouter);
app.use('/checkout', isAuthenticated, checkoutRouter);
app.use('/textbooks', isAuthenticated, textbooksRouter);
app.use('/checkedout', isAuthenticated, checkedoutRouter);
app.use('/barcodescan', isAuthenticated, barcodescanRouter);
app.use('/usermanagement', isAuthenticated, usermanagementRouter);
app.use('/checkinreminders', isAuthenticated, checkinremindersRouter);
app.use('/inventorystatus', isAuthenticated, inventorystatusRouter);
app.use('/profile', isAuthenticated, profileRouter);
app.use('/inventoryupdate', isAuthenticated, inventoryupdateRouter);
app.use('/dashboard1', isAuthenticated, dashboard1Router);
app.use('/lowstocks', isAuthenticated, lowstocksRouter);
app.use('/overdue', isAuthenticated, overdueRouter);
app.use('/update', isAuthenticated, updateRouter);
app.use('/availableitems', isAuthenticated, availableitemsRouter);
app.use('/textbooks', isAuthenticated, textbooksRouter);
app.use('/textbook1', isAuthenticated, textbook1Router);
app.use('/textbook2', isAuthenticated, textbook2Router);
app.use('/textbook3', isAuthenticated, textbook3Router);
app.use('/textbook4', isAuthenticated, textbook4Router);
app.use('/textbook5', isAuthenticated, textbook5Router);
app.use('/textbook6', isAuthenticated, textbook6Router);
app.use('/textbook7', isAuthenticated, textbook7Router);
app.use('/textbook8', isAuthenticated, textbook8Router);
app.use('/textbook9', isAuthenticated, textbook9Router);
app.use('/textbook10', isAuthenticated, textbook10Router);
app.use('/textbook11', isAuthenticated, textbook11Router);
app.use('/textbook12', isAuthenticated, textbook12Router);


app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  res.status(err.status || 500);
  res.render('error');
});

module.exports = app, server, io;
