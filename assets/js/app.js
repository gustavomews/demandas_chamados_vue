new Vue({
    el: '#app',
    data: {
        url: 'http://127.0.0.1:8000/api',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        msgReturnLogin: '',
        msgReturnRegister: '',
        registerErrors: {
            'name': '',
            'email': '',
            'password': ''
        }
    },
    methods: {
        login(e) {
            let url = this.url + '/login'

            let data = new URLSearchParams({
                'email': this.email,
                'password': this.password
            })

            let config = {
                headers: {
                    'Accept': 'application/json',
                }
            }

            axios.post(url, data, config)
                .then((response) => {
                    if (response.data.token) {
                        document.cookie = 'token=' + response.data.token + ';SameSite=Lax'
                        this.msgReturnLogin = "Login efetuado com sucesso!"

                        //
                        // e.target.submit()
                    } else {
                        this.msgReturnLogin = response.data.error + '!'
                        document.getElementById('passwordLogin').focus()
                    }
                })
                .catch((errors) => {
                    this.msgReturnLogin = errors.response.data.error
                })


            // FETCH ---------------------------------------------------------------------


            // fetch > then enviar requisição post para api
            /*
            let config = {
                method: 'POST',
                body: new URLSearchParams({
                    'email': this.email,
                    'password': this.password
                })
            }

            fetch(url, config)
                .then(response => response.json())
                .then(data => {
                    if (data.token) {
                        document.cookie = 'token=' + data.token + ';SameSite=Lax'
                    } else {
                        this.msgReturn = data.error
                        document.getElementById('passwordLogin').focus()
                    }

                    // Concluir login > Sequencia do envio do form
                    //e.target.submit()
                })
            */
        },
        register(e) {
            let url = this.url + '/register'

            let data = new URLSearchParams({
                'name': this.name,
                'email': this.email,
                'password': this.password,
                'password_confirmation': this.password_confirmation
            })

            let config = {
                headers: {
                    'Accept': 'application/json',
                }
            }

            axios.post(url, data, config)
                .then((response) => {
                    this.registerErrors = {
                        'name': '',
                        'email': '',
                        'password': ''
                    }
                    this.msgReturnRegister = "Registro efetuado com sucesso!"
                })
                .catch((errors) => {
                    if (errors.response.data.errors) {
                        this.registerErrors.name = errors.response.data.errors.name ? '<i class="fa-solid fa-caret-right"></i> ' + errors.response.data.errors.name[0] : ''
                        this.registerErrors.email = errors.response.data.errors.email ? '<i class="fa-solid fa-caret-right"></i> ' + errors.response.data.errors.email[0] : ''
                        this.registerErrors.password = errors.response.data.errors.password ? '<i class="fa-solid fa-caret-right"></i> ' + errors.response.data.errors.password[0] : ''
                        this.msgReturnRegister = ''//errors.response.data.message
                    }
                })
        }
    }
})