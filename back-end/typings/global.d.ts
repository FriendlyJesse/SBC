declare global {
  namespace Express {
    interface Response {
      msg: (err: string | Error, status?: number, data?: any) => void
    }
    interface Request {
      auth: {
        username: string,
        id: number,
        isAdmin: number
      }
    }
  }
}

export {}