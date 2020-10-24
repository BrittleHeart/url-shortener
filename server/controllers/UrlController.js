import {urls_collection} from '../server'
import * as path from 'path'
import * as yup from 'yup'
const {nanoid} = require('nanoid')
// import nanoid from nanoid

const nouPathFound = path.resolve('../public/404.html')

class UrlController {
    notFound(req, res) {
        return res.status(200).sendFile(nouPathFound)
    }

    async redirectToUrl(req, res) {
        const {id: slug} = req.params

        if(!slug)
            return res.status(400).redirect('/')

        const urls = await urls_collection.findOne({slug})
        
        if(!urls)
            return res.status(404).redirect('/')
        
        return res.status(200).redirect(urls.url)
    }

    async index(req, res) {
        const urls = await urls_collection.find()

        if(!urls)
            return res.status(404).redirect('notFound')
        
        return res.status(200).json({status: 200, urls})
    }

    async store(req, res) {
        let {url, slug} = req.body

        const schema = yup.object().shape({
            url: yup.string().min(3).url().trim().required(),
            slug: yup.string().min(3).max(10).matches('[a-zA-Z0-9#-_]')
        })

        try{await schema.validate({url, slug})}
        catch(error) {return res.status(400).json({status: 400, message: error.message})}

        const slug_exists = await urls_collection.findOne({slug})

        if(slug_exists)
            return res.status(400).json({status: 400, message: `Slug - ${slug}, already exists`})

        if(!slug)
            slug = nanoid(5).toLowerCase()
        else
            slug = slug.toLowerCase()
        
        const save_url = await urls_collection.insert({url, slug})
        if(!save_url)
            return res.status(500).json({status: 500, message: 'New url has not been created.'})

        return res.status(201).json({status: 201, save_url})
    }
}

export default UrlController