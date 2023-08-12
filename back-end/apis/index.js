const { Router } = require('express')
const router = Router()

const routes = {
  '/users': require('./modules/users'),
  '/cards': require('./modules/cards'),
}

Object.keys(routes).forEach(key => {
  router.use(key, routes[key])
})

module.exports = router