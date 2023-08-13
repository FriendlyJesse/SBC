import { Response, NextFunction } from 'express'

export default (req: any, res: any, next: NextFunction) => { // 信息反馈
  res.msg = (err: string | Error, status = 200, data: any) => {
    res.status(status).send({
      message: err instanceof Error ? err.message : err,
      data
    })
  }
  next()
}