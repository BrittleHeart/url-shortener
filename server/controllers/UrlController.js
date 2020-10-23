import {urls_collection} from '../server'

class UrlController extends Controller {
    async index() {
        const urls = urls_collection.find()

        if(urls) {}
    }
}

export default UrlController