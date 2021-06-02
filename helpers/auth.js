const moment = require('moment')
const jwt = require('jsonwebtoken')

module.exports = {
  encodeToken: async(user) => {
    const payload = {
      exp: moment().add(14, 'days').unix(),
      iat: moment().unix(),
      sub: user.role,
    }
    user.token = await jwt.sign(payload, 'secret')
    return user
  },
  decodeToken: (token, callback) => {
    const payload = jwt.decode(token, 'secret')
    const now = moment().unix()
    // check if the token has expired
    if (now > payload.exp) callback('Token has expired.')
    else callback(null, payload)
  },
}
