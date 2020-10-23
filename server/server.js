const express = require('express')
const yup = require('yup')
const morgan = require('morgan')
const monk = require('monk')
const {nanoid} = require('nanoid')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(morgan('common'))
app.use(cors())
app.use(express.static('./public'))

const database = monk(process.env.MONGODB_URI)
const urls_collection = database.get('urls')



const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server is listen here -> http://localhost:${PORT}`))