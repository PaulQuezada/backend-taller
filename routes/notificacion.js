import express from 'express';
const router = express.Router();

// importar el modelo nota
import notificacionSchema from '../models/notificacion';

router.post('/addnotificacion', async (req, res) => {
  const body = req.body;
  const notificacion = notificacionSchema(body)
  console.log(body)
  await notificacion.save()
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    });

});

router.delete('/eliminarnotificacion/:id', async (req, res) => {
  const notificacionID = req.params.id
  console.log(req.params)
  const notificacion = notificacionSchema.find()
  await notificacion.deleteOne({ _id: notificacionID })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    });
});

router.get('/getallnotificaciones', async (req, res) => {
  const notificacion = await notificacionSchema.find()
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    });
});

// Actualizar el estado de una notificación y un campo adicional
router.put('/cambioEstado', async (req, res) => {
  const body = req.body;
  const notificacionId = body.notificacionId;
  const estadoCambiar = body.estado;
  const tipoCambiar = body.tipo; // Asegúrate de obtener el valor del campo adicional desde el cuerpo de la solicitud

  console.log(body)
  // Actualizar el estado y el campo adicional
  try {
    const resp = await notificacionSchema.updateOne(
      {
        _id: notificacionId,
      },
      {
        estado: estadoCambiar,
        tipo: tipoCambiar, // Agrega el campo adicional aquí
      }
    );
    res.status(200).json(resp);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el estado y el campo adicional' });
  }
});

// Cambio de tipo de notificación
router.put('/cambioTipo', async (req, res) => {
  const body = req.body;
  const notificacionId = body.notificacionId;
  const tipoCambiar = body.tipo; // Asegúrate de obtener el valor del campo adicional desde el cuerpo de la solicitud
  console.log(body)
  // Actualizar el estado y el campo adicional
  try {
    const resp = await notificacionSchema.updateOne(
      {
        _id: notificacionId,
      },
      {
        tipo: tipoCambiar, // Agrega el campo adicional aquí
      }
    );
    res.status(200).json(resp);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el estado y el campo adicional' });
  }
});
// Cambio de visto de notificación
router.put('/cambioVisto', async (req, res) => {
  const body = req.body;
  const notificacionId = body.notificacionId;
  const emisor_receptor = body.emisor_receptor;
  const vistoCambiar = body.visto; // Asegúrate de obtener el valor del campo adicional desde el cuerpo de la solicitud
  console.log(body)
  if (emisor_receptor == "Emisor") {
    // Emisor
    // Actualizar el estado y el campo adicional
    console.log("--------------------")
    console.log("1")
    
    try {
      const resp = await notificacionSchema.updateOne(
        {
          _id: notificacionId,
        },
        {
          vistoemisor: vistoCambiar, // Agrega el campo adicional aquí
        }
      );
      res.status(200).json(resp);
    } catch (err) {
      res.status(500).json({ message: 'Error al actualizar el estado y el campo adicional' });
    }
  } else if (emisor_receptor == "Receptor") {
    // Receptor
    // Actualizar el estado y el campo adicional
    console.log("--------------------")
    console.log("2")
    try {
      const resp = await notificacionSchema.updateOne(
        {
          _id: notificacionId,
        },
        {
          vistoreceptor: vistoCambiar, // Agrega el campo adicional aquí
        }
      );
      res.status(200).json(resp);
    } catch (err) {
      res.status(500).json({ message: 'Error al actualizar el estado y el campo adicional' });
    }
  }
  console.log(body)

});
module.exports = router;