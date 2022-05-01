
console.log(Vue)

new Vue({
    el: '#app', 
    data(){
        return {
            form:{
                value:'',
                type: null
                
            },
            result:{
                hash:"",
                type:"",
            }
        }
    },
    methods:{
        async startHash(){
            let type

            if (this.form.type=='true')
            {
                type='sha256'
                let url='/api/sha256/'+this.form.value
                console.log(url)
                const response = await request(url)
                this.result.hash=response
                this.result.type=type
            }
            else
            {
                type='streebog'
                let url='/api/streebog/'+this.form.value
                console.log(url)
                const response = await request(url)
                this.result.hash=response
                this.result.type=type
            }
            this.form.value=this.form.type=''
        },
        async startHashPostVer(){
            let type
            const {...data}=this.form
            if (this.form.type=='true')
            {
                type='sha256'
            }
            else
            {
                type='streebog'

            }

            const response = await request('/api/post', 'POST', data)
            console.log(response)
            this.result.hash=response
            this.result.type=type

            this.form.value=this.form.type=''
        }
    }
})

async function request(url, method='GET', data=null){
    try
    {
        const headers={}
        let body 

        if (data) {
            headers['Content-Type']='application/json'
            body=JSON.stringify(data)
        }
        console.log(method)
        console.log(headers)
        console.log(body)


        const response = await fetch(url,{
            method,
            headers,
            body
        })
        return await response.json()
    }
    catch (e)
    {
        console.warn('Error',e.message)
    }
}