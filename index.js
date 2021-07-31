import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 5000;

dotenv.config()
app.use(bodyParser.json());
app.use(cookieParser())

app.use('/api/', authRoutes)
app.use('/api/users', usersRoutes)

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: http://localhost:${5000}`)))
  .catch(err => { console.log(err) })

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


