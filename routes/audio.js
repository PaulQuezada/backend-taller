import express from 'express';
const router = express.Router();

// importar el modelo nota
import audioSchema from '../models/audio';

router.post('/addaudio', async(req, res) => {
    const body = req.body;  
    const audio = audioSchema(body)       
    console.log(body)
    await audio.save()
    .then((result) => {
      res.json(result)
      
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    }); 
    
  });
  router.get('/getallaudio',async(req,res)=>{
    const audio = await  audioSchema.find()
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    });
  });
module.exports = router; 