import express from 'express';
const router = express.Router();

// importar el modelo nota
import viajeSchema from '../models/viaje';

router.post('/addviaje', async (req, res) => {
  const body = req.body;
  console.log(body)
  const viaje = viajeSchema(body)

  await viaje.save()
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    });
});
router.get('/getallviajes', async (req, res) => {
  const viajes = await viajeSchema.find()
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    });
});

router.get('/getviajebyid/:id', async (req, res) => {
  const viajeId = req.params.id
  console.log(req.params)
  await viajeSchema.findOne({
    _id: viajeId
  }).populate({path:"pasajeros",select:["nombre","imagenperfil"]})
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    });

}
);

router.delete('/eliminarviajebyid/:id', async (req, res) => {
  const viajeID = req.params.id
  console.log(req.params)
  const viaje = viajeSchema.find()
  await viaje.deleteOne({ _id: viajeID })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    });
});

router.put('/cambiarEstado', async (req, res) => {
  const body = req.body;
  const viajeid = body.viajeid;
  const estadoCambiar = body.estado;
  console.log(viajeid)
  console.log(estadoCambiar)
  // Actualizar los datos
  const resp = await viajeSchema.updateOne(
    { _id: viajeid },
    { $set: { estado: estadoCambiar } }
  );
  res.json(resp);
});

router.put('/cambiarPasajeros', async (req, res) => {
  const body = req.body;
  const viajeid = body.viajeid;
  const cambiopasajeros = body.pasajeros;
  console.log(body)
  // Actualizar los datos
  const resp = await viajeSchema.updateOne(
    { _id: viajeid },
    { $set: { pasajeros: cambiopasajeros } }
  );
  res.json(resp);
});


// Agregar un mensaje al chat
router.put('/mensajechat', async (req, res) => {
  const body = req.body;
  const idviaje = body.idviaje;
  const chatmensaje = body.mensaje;
  console.log(idviaje)
  console.log(chatmensaje)

  // Actualizar los datos
  const resp = await viajeSchema.updateOne(

    {
      _id: idviaje
    },
    {
      $push:
      {
        chat: chatmensaje
      }
    },
  )
  res.json(resp);
  //console.log(res.data)
});
// Agregar un mensaje al chat
router.put('/agregarpasajero', async (req, res) => {
  const body = req.body;
  const idviaje = body.idviaje;
  const pasajeroAgregar = body.pasajeroAgregar;
  const parada = body.parada;
  // Actualizar los datos
  const resp = await viajeSchema.updateOne(

    {
      _id: idviaje
    },
    {
      $push:
      {
        pasajeros: pasajeroAgregar,
        parada: parada
      }
    },
  )

  res.json(resp);
});

// Agregar un asiento
router.put('/cambiarAsientos', async (req, res) => {
  const body = req.body;
  const idviaje = body.idviaje;
  const numasiento = body.numasiento;
  console.log(body)
  // Actualizar los datos
  const resp = await viajeSchema.updateOne(

    {
      _id: idviaje
    },

    [
      { $set: { disponibles: { $subtract: ["$disponibles", 1] } } }
    ]
    ,
  )

  res.json(resp);
});



// Agregar un asiento

router.put('/updateAudioViaje', async (req, res) => {
  const body = req.body;
  const idviaje = body.idviaje;
  const idemisorAgregar = body.idemisorAgregar;
  const audio = body.audio;
  console.log(body)
  // Actualizar los datos
  const resp = await viajeSchema.updateOne(

    {
      _id: idviaje
    },
    {
      $push:
      {
        idemisor: idemisorAgregar,
        mensaje: audio
      },
      $push: { mensajesdevoz: mensajeDeVoz }
    },
  )

  res.json(resp);
});


    




module.exports = router;