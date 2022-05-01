import express from 'express';
import path from 'path'
import swaggerUI from 'swagger-ui-express';
import specs from './swagger.js';
import { gostEngine } from 'node-gost-crypto';
import { createHash } from 'crypto';
import router from './routes.js';



// const { createHash } = require('crypto');
// const { gostEngine } = require('node-gost-crypto');




// const express=require('express')
const app=express()
// const path=require('path')

app.use(express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));


// //GET
// app.get('/api/sha256/:text', (req, res) => {
//   return res.status(200).json(hash256(req.params.text));
// });

// app.get('/api/streebog/:text', (req, res) => {
//   return res.status(200).json(streebog(req.params.text));
// });



// app.post('/api/post', (req, res) => {
//   let text_value = req.body.value
//   let type=req.body.type
//   console.log(text_value);
//   console.log(type);

//   if (type=='true')
//   {
//     return res.status(201).json(hash256(text_value));
//   }
//   else if (type=='false')
//   {
//     return res.status(201).json(streebog(text_value));
//   }
// });


const __dirname = path.resolve();
app.use(express.static(path.resolve(__dirname,'front')))

app.use('/', router);


app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'front','index.html'))
})


app.listen(3000,()=>console.log('server has been started'))

