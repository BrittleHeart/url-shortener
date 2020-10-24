const app = new Vue({
    el: '#app',
    data: {
        url: '',
        slug: '',
        name,
        urls: []
    },
    methods: {
        async fetchData() {
            const response = await fetch(`http://localhost:3000/urls`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json;charset=utf-8',
                },
            })

            const getResponse = await response.json()
            this.urls = getResponse.urls
        },

        async createUrl() {
            await fetch(`http://localhost:3000/urls`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json;charset=utf-8',
                },
                body: JSON.stringify({name: this.name, url: this.url, slug: this.slug ? this.slug : undefined})
            })
        }
    },
    created() {
        this.fetchData()
    }
})