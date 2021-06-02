const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const  fs = require('fs');

const routes = require('./routes/users');

const app = express();

//swagger implementation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


if (process.env.NODE_ENV !== 'test') { app.use(morgan('dev')); }
// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: '1gb', extended: true }))
app.use(cookieParser());

app.use('/users', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/* eslint-disable*/
app.use((err, req, res, next) => {
  const message = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({
    status: 'error',
    message: err,
  });
});
/* eslint-enable */

module.exports = app;