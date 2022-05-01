import express from 'express';
import path from 'path'
import swaggerUI from 'swagger-ui-express';
import docs from './swagger.js';

import router from './routes.js';


const app=express()

app.use(express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));



const __dirname = path.resolve();
app.use(express.static(path.resolve(__dirname,'front')))

app.use('/', router);


app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'front','index.html'))
})


app.listen(3000,()=>console.log('server has been started'))

