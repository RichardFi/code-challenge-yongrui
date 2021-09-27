import 'dotenv/config'
import morgan from 'morgan'
import cors from 'cors'
import express from 'express'
import errorHandler from './middleware/errorHandler'
import validationErrorHandler from './middleware/validationErrorHandler'
import routes from './routes'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use(validationErrorHandler)
app.use(errorHandler)

app.use('/api', routes)

export default app
