import express from 'express'
import middleware from '../middleware/route.middleware.js'
import {
  index,
  create
} from '../controllers/users.js'

const router = express.Router()

router.get('/', middleware, index)
router.post('/create', middleware, create)

export default router