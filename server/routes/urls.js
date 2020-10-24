import {app} from '../server'
import UrlController from '../controllers/UrlController'

const urls = new UrlController()

app.get('/urls', async (req, res) => await urls.index(req, res))
app.get('/urls/:id', async (req, res) => await urls.redirectToUrl(req, res))
app.post('/urls', async (req, res) => await urls.store(req, res))