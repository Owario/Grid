import express from 'express';
import { gostEngine } from 'node-gost-crypto';
import { createHash } from 'crypto';



function hash256(string) {
    return createHash('sha256').update(string).digest('hex');
  }
  
  function streebog(string){
      const buffer = Buffer.from(string);
      const digest = gostEngine.getGostDigest({name: 'GOST R 34.11', length: 256, version: 1994});
      return Buffer.from(digest.digest(buffer)).toString('hex')
  }
  
  console.log(hash256('foo'));
  console.log(streebog('foo'));



const router = express.Router();

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Request:
//  *       type: object
//  *       required:
//  *         - text
//  *         - chosentype
//  *       properties:
//  *         text:
//  *           type: string
//  *         chosentype:
//  *           type: boolean
//  *       example:
//  *         text: some text
//  *         chosentype: true
//  */




//GET
/**
 * @swagger
 * /api/sha256/{text}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: text
 *         required: true
 *         schema:
 *           type: string
 *         description: Text you want to encrypt using sha256
 *     summary: Returns hash encrypted by sha256
 *     responses:
 *       200:
 *         description: encrypted string
 *         content: text/plain; charset=utf-8
 */
router.get('/api/sha256/:text', (req, res) => {
    return res.status(200).json(hash256(req.params.text));
  });
 

/**
 * @swagger
 * /api/streebog/{text}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: text
 *         required: true
 *         schema:
 *           type: string
 *         description: Text you want to encrypt using streebog
 *     summary: Returns hash encrypted by streebog
 *     responses:
 *       200:
 *         description: encrypted string
 *         content: text/plain; charset=utf-8
 */  
router.get('/api/streebog/:text', (req, res) => {
return res.status(200).json(streebog(req.params.text));
});



/**
 * @swagger
 * /api/post:
 *   post:
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: request
 *         description: The message and choosed encryption type, value mean text, in type true stands for sha256, false for streebog
 *         schema:
 *           type: object
 *           required:
 *             - value
 *             - type
 *           properties:
 *             value:
 *               type: string
 *             type:
 *               type: string
 *           example:
 *             value: 'some text some text again'
 *             type: 'true'
 *     summary: Returns hash encrypted with streebog
 *     responses:
 *       201:
 *         description: encrypted string
 *         content: text/plain; charset=utf-8
 */        
router.post('/api/post', (req, res) => {
    let text_value = req.body.value
    let type=req.body.type
    console.log(text_value);
    console.log(type);
  
    if (type=='true')
    {
      return res.status(201).json(hash256(text_value));
    }
    else if (type=='false')
    {
      return res.status(201).json(streebog(text_value));
    }
});




export default router
