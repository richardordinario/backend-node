import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const login = async (req, res, next) => {

  let email = req.body.email
  let password = req.body.password

  await User.findOne({ email: email }, function (err, user) {
    if (err) return res.status(500).json({ err })
    if (!user) return res.status(403).json({ message: 'No user found' })

    bcrypt.compare(password, user.password, function (error, result) {
      if (error) return res.json({ error })

      if (result) {
        let token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '24h' })

        res.cookie('x-access-token', token, {
          path: '/',
          sameSite: true,
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
        })

        return res.status(200).json({ token })
      }

      return res.status(403).json({ message: 'Password not matched' })
    })

  })
}
