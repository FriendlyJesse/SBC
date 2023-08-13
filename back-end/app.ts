import createError from 'http-errors'
import logger from 'morgan'
import path from 'path'
import cors from 'cors'
import { expressjwt } from 'express-jwt'
import express, { Request, Response, NextFunction } from 'express'
import CONFIG from './config/index'
import apis from './apis'

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app
  .use(logger('dev'))
  .use(express.json())
  .use(cors())
  .use(express.urlencoded({ extended: false }))
  .use((req, res: any, next) => { // 信息反馈
    res.msg = (err: string | Error, status = 200, data: any) => {
      res.status(status).send({
        message: err instanceof Error ? err.message : err,
        data
      })
    }
    next()
  })
  .use(expressjwt({ secret: CONFIG.SECRET_KEY, algorithms: ['HS256'] }).unless({ path: ['/api/users/login'] }))

// apis
app.use('/api', apis)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
