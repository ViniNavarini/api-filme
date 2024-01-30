const env = require('../config/env')

module.exports = {
  get_url (environment, route, query) {
    return env.doo.urls[environment].baseUrl+`${env.doo.routes[route].path}`+ query
  }
}
