import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export default async (req, res, next) => {
  console.log(req.headers)
  try {
    let token = req.cookies['x-access-token']

    if (!token) return res.status(401).send("2")

    const decode = jwt.verify(token, process.env.TOKEN_SECRET)

    console.log(decode._id);

    const user = await User.findOne({ _id: decode._id })

    if (!user) return res.status(401).send()

    req.user = user

    return next()

  } catch (error) {
    console.log(error)
    res.status(401).send('1')
  }
}