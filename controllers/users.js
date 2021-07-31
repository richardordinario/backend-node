import formidable from 'formidable'
import formatError from 'mongoose-error-formatter'

import User from '../models/user.js'

export const index = async (req, res) => {
  try {
    const users = await User.find()
    console.log(req.user)
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const create = async (req, res, next) => {

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })

  try {
    await newUser.save()
    res.status(201).json('User Created')

  } catch (error) {
    const formattedMessage = formatError(error)
    console.log(formattedMessage)
    res.status(404).json({ message: error.message.errors })
  }
}

export const file = async (req, res, next) => {
  const form = formidable({ multiples: true })

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err)
      return
    }

    res.json({ fields, files })
  })
}