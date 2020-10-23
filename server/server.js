import express from 'express'
import morgan from 'morgan'
import monk from 'monk'
import cors from 'cors'
import * as path from 'path'
import * as fs from 'fs'

require('dotenv').config()

export const app = express()

app.use(express.json())
app.use(morgan('common'))
app.use(cors())
app.use(express.static('./public'))

const database = monk(process.env.MONGODB_URI)
export const urls_collection = database.get('urls')

fs.readdir(path.resolve('./routes/'), (error, files) => {
    if(error)
        throw new Error(error)
    
    if(files.length === 0)
        throw new Error('Target directory is empty')
    
    files.forEach(file => require(`./routes/${file}`))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is listen here -> http://localhost:${PORT}`))