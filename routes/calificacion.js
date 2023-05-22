import express from 'express';
const router = express.Router();

// importar el modelo nota
import calificacionSchema from '../models/calificacion';

router.post('/addcalificacion', async(req, res) => {
    const body = req.body;  
    const calificacion = calificacionSchema(body)       
    console.log(body)
    await calificacion.save()
    .then((result) => {
      res.json(result)
      
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    }); 
    
  });
  router.get('/getallcalificacion',async(req,res)=>{
    const calificaciones = await  calificacionSchema.find()
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    });
  });
  
  module.exports = router;