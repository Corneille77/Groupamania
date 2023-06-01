const express = require('express')
const usersControllers = require('../controllers/userControllers')

exports.router = (() => {

    const userRouter = express.Router()

    userRouter.route('/users').post(usersControllers.addUser)
    userRouter.route('/login').post(usersControllers.login)
    userRouter.route('/users').get(usersControllers.allUsers)
    userRouter.route('/users/:id').get(usersControllers.user)
    userRouter.route('/users/:id').put(usersControllers.updateUser)
    userRouter.route('/users/:id').delete(usersControllers.deleteUser)

    return userRouter;
})()