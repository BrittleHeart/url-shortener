const app = new Vue({
    el: '#app',
    data: {
        url: '',
        slug: '',
        loading: false,
        name,
        urls: []
    },
    methods: {
        async fetchData() {
            this.loading = true;

            const response = await fetch(`http://localhost:3000/urls`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json;charset=utf-8',
                },
            })

            this.loading = false;

            const getResponse = await response.json()
            this.urls = getResponse.urls
        },

        async createUrl() {
            this.loading = true

            const response = await fetch(`http://localhost:3000/urls`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json;charset=utf-8',
                },
                body: JSON.stringify({name: this.name, url: this.url, slug: this.slug ? this.slug : undefined})
            })
            
            this.loading = false

            const data = await response.json()
            const newUrl = data.save_url

            this.urls.push(newUrl)

            this.url = ""
            this.name = ""
            this.slug ? this.slug = "" : ''
        }
    },
    created() {
        this.fetchData()
    }
})