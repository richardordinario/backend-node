import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, lowercase: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

schema.set('timestamps', true)

schema.pre('save', async function (next){
  try {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(this.password, salt)
    this.password = hashed
    next()
  } catch(error) {
    next(error)
  }
})

export default mongoose.model('Users', schema)