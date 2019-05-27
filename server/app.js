const compression = require('compression');
const helmet = require('helmet');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const exphbs = require('express-handlebars');
const ProductsRoute = require('./products/ProductsRoute');

const app = express();

const publicPath = path.resolve('public');

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

app.use(cookieParser('cersei'));

app.use(session({
  secret: 'Ibrakadabra',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true },
}));

app.set('trust proxy', 1); // trust first proxy

// parse and interprete compressed files
app.get('*.js.gz', (req, res, next) => {
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

app.set('view cache', true);
app.set('views', publicPath);
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: '' }));

app.use(express.static(publicPath));

app.use('/api/v1/', ProductsRoute);

app.use('/', (req, res) => {
  res.render('index.handlebars');
});

app.use((req, res) => {
  res.status(404).json({
    error: true,
    message: 'error 404 - Route not found',
  });
});

app.use((err, req, res) => {
  res.status(err.status || 500).json({
    error: true,
    body: err.message,
    message: 'Error in app, passed down to error handler',
  });
});

module.exports = app;
