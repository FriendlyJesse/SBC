const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
const path = require('path')
const cors = require('cors')
const { expressjwt } = require('express-jwt')
const { SECRET_KEY } = require('./config')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app
  .use(logger('dev'))
  .use(express.json())
  .use(cors())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => { // 信息反馈
    res.msg = (err, status = 200, data) => {
      res.status(status).send({
        message: err instanceof Error ? err.message : err,
        data
      })
    }
    next()
  })
  .use(expressjwt({ secret: SECRET_KEY, algorithms: ['HS256'] }).unless({ path: ['/api/users/login'] }))

// apis
app.use('/api', require('./apis'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
