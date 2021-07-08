import express from 'express'
import formatError from 'mongoose-error-formatter'

import Users from '../models/users.js'

const router = express.Router()

export const index = async (req, res) => {
  try {
    const users = await Users.find()

    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const create = async (req, res) => {

  const newUsers = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })

  try {
    await newUsers.save()
    res.status(201).json('User Created')

  } catch (error) {
    const formattedMessage = formatError(error)
    console.log(formattedMessage)
    res.status(404).json({ message: error.message.errors })
  }
}