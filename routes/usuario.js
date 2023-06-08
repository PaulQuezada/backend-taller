import express from 'express';
const router = express.Router();

// importar el modelo nota
import usuarioSchema from '../models/usuario';



router.post('/addusuario', async (req, res) => {
  const body = req.body;
  console.log("--------------------")
  console.log(body)
  console.log("--------------------")

  const usuario = usuarioSchema(body)
  await usuario.save()
    .then((result) => {
      res.json(result)

    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    });
}
);

router.post('/login', async (req, res) => {
  const body = req.body;
  console.log(body)
  const contrasena = body.contraseña
  const correo = body.correo
  const resp = await usuarioSchema.findOne({ correo, contrasena })
    .then((result) => {
      console.log("result")
      console.log(result)
      console.log(JSON.stringify(result))
      if (JSON.stringify(result) !== "null") {
        result.contraseña = ""
        res.json(result)
      } else {
        res.send(false)
      }
    })
    .catch((err) => {
      res.json(err)
    });

}
);
router.get('/getuserbyid/:id', async (req, res) => {
  const userID = req.params.id
  console.log(req.params)
  await usuarioSchema.findOne({
    _id: userID
  }).populate({path:"viajes"})
    .then((result) => {
      console.log(result)
      result.contraseña = ""
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
      res.send(false)
    });

}
);

router.get('/getallusuarios', async (req, res) => {
  const usuarios = await usuarioSchema.find()
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    });



});
router.put('/updatecontrausuario', async(req, res) => {
  const body = req.body;
  const userid = body.userid;
  const contranueva = body.contranueva;
  // Actualizar los dato
  const resp = await usuarioSchema.updateOne (
    {
      _id : userid,


    },
    {

      contrasena : contranueva
      
    }
  ) .then((result) => {
    res.json(result)
  })
  .catch((err) => {
    console.log(err)
    res.json(err)
  });
  
  
});
// Actualizar los datos de un usuario
router.put('/updateusuario', async (req, res) => {
  const body = req.body;
  const userid = body.userid;
  const viajeid = body.viajeid;
  // Actualizar los dato
  const resp = await usuarioSchema.updateOne(
    {
      _id : userid
    },
    {
      $push:
      {
        viajes: viajeid
      }
    }
  )
  console.log(resp)

});
router.put('/updatenumcontacto', async (req, res) => {
  const body = req.body;
  const userid = body.userid;
  const numero = body.numero;
  console.log(body)
  const resp = await usuarioSchema.updateOne(
    {
      _id: userid
    },
    {
      $set:
      {
        numContacto: numero
      }
    }
  )
  res.send("Update ncontacto")
});


router.put('/updatefotoperfil', async (req, res) => {
  const body = req.body;
  const userid = body.userid;
  const fotoperfil = body.fotoperfil;
  console.log(body)
  // Actualizar los dato
  const resp = await usuarioSchema.updateOne(
    {
      _id: userid
    },
    {
      $set:
      {
        imagenperfil: fotoperfil
      }
    }
  )
  console.log(resp)
});
router.put('/updatefotoauto', async (req, res) => {
  const body = req.body;
  const userid = body.userid;
  const vehiculo = body.vehiculo;
  console.log(body)
  // Actualizar los dato
  const resp = await usuarioSchema.updateOne(
    {
      _id: userid
    },
    {
      $set: {
        "vehiculo.imagen": vehiculo
      }
    }
  )
  res.send("Update fotoauto")
});

router.put('/updatePanico', async (req, res) => {
  const body = req.body;
  const userid = body.userid;
  const panico = body.panico;
  console.log(body)
  // Actualizar los dato
  const resp = await usuarioSchema.updateOne(
    {
      _id: userid
    },
    {
      $set:
      {
        contPanico: panico
      }
    }
  )
  res.send("Update Panico")
});


router.put('/updatepanic', async (req, res) => {

  const body = req.body;
  const userid = body.userid;
  const contPanico = body.contPanico;
  console.log(body)
  // Actualizar los dato
  const resp = await usuarioSchema.updateOne(
    {
      _id: userid
    },
    {
      $set:
      {
        contPanico: contPanico
      }
    }
  )
  console.log(resp)
});

router.get('/getuserviajesbyid/:id', async(req, res) => 
  {
    const userID = req.params.id
    console.log(req.params)
    await usuarioSchema.findOne({_id:userID
     
    })
    .then((result) => {
      console.log(result.viajes)
      res.json(result.viajes)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    });

})
module.exports = router;