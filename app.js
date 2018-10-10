const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const mongoose = require('mongoose')
const verify = require('./jwt/verify')
const passport = require('passport')

const UserRoutes = require('./routes/v1/auth'),
BucketListRoutes = require('./routes/v1/bucketlist')

const { HTTPS } = require ('express-sslify')
const path =require('path');

const app = express()
if (app.get('env') !== 'development') {
    app.use(HTTPS({ trustProtoHeader: true }))
}

var corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://brain-buckets.herokuapp.com'
    ],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: ['ACCEPT', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Accept', 'Content-Type', 'Set-Cookie', 'Authorization'],
    credentials: true
}


app.use(cors(corsOptions))
app.options(cors())
app.use(logger('dev'))

// app.use(function(req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   // Request methods you wish to allow
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//   )
//   // Request headers you wish to allow
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With, content-type, Authorization, Content-Type'
//   )
//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true)
//   // Pass to next layer of middleware
//   next()
// })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/v1/auth', UserRoutes)
app.use('/v1/bucketlists', BucketListRoutes)



app.use(express.static('./docs'));

app.get('/', function(req, res) {
    res.sendFile(`${__dirname}/docs/index.html`)
})

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found')
//     err.status = 404
//     next(err)
// })

// // error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     // res.locals.message = err.message;
//     //res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     //res.status(err.status || 500);
//     res.json(err)
// })

var port = process.env.PORT || 8000
console.log('Port ', port)

    app.listen(port, () => console.log('Listening on port ' + port))
