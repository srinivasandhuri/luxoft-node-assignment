const bcrypt = require('bcryptjs')
const db = require('../db/connection')
const User = db.user
const authHelper = require('../helpers/auth')

module.exports = {
  createUser: async (req, res, next) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: 'username can not be empty!',
      })
      return
    }
    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(req.body.password, salt)
    // Create a user
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: passwordHash,
      role: req.body.role,
    }
    // Save user in the database
    await User.create(user)
      .then(() => {
        res.status(200).json({
          message: 'User created successfully',
        })
      })
      .catch(() => {
        res.status(500).json({
          message: 'error',
        })
      })
  },
  loginUser: async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    return User.findOne({ where: { email: email } })
      .then((response) => {
        if (!comparePass(password, response.password)) {
          return res.status(401).json({
            status: 'error',
            message: 'Invalid Credentials',
          })
        }
        return response
      })
      .then((response) => {
        return authHelper.encodeToken(response)
      })
      .then((user) => {
        res.status(200).json({
          status: 'success',
          user,
        })
      })
      .catch((err) => {
        res.status(206).json({
          status: 'error',
          message: 'Email does not exists',
        })
      })
      .catch((err) => {
        res.status(500).json({
          status: 'error',
          message: err,
        })
      })
  },
  getAllUsers: async (req, res, next) => {
    User.findAll()
      .then((data) => {
        res.send(data)
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving tutorials.',
        })
      })
  },
  getUserByUsername: async (req, res, next) => {
    var username = req.params.username
    User.findOne({ where: { name: username } })
      .then((data) => {
        if (data) {
          delete data.password
          res.status(200).json({
            message: 'user details fetched successfully',
            data,
          })
        } else {
          res.status(204).json({
            message: 'No Content',
          })
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving user details.',
        })
      })
  },
  getUserById: async (req, res, next) => {
    const userId = req.params.id
    User.findByPk(userId)
      .then((data) => {
        if (data) {
          delete data.password
          res.status(200).json({
            message: 'user details fetched successfully',
            data,
          })
        } else {
          res.status(204).json({
            message: 'No Content',
          })
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving user details.',
        })
      })
  },
}
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword)
}
