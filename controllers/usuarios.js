const {response,request}=require('express')
const Usuario=require('../models/usuario')
const bcryptjs=require('bcryptjs');
const mongoose = require('mongoose');
    

const usuariosGet=async(req=request, res=response)=> {
    //const {q, nombre='No name',apiKey,limit, page=1}=req.query;
    const {limite=5, desde=0}=req.query
    const query={estado:true}
    
    const [total, usuarios]= await Promise.all([Usuario.countDocuments(query), 
      Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite))
      ])

    res.json({
      
      total,
      usuarios
    });
  }
const usuariosPost=async (req, res=response)=> {
    
    const {nombre, correo, password,rol}=req.body;
    const usuario=new Usuario({nombre,correo,password,rol})

    //Verificar si el correo existe
    
    //Encriptar la contraseña
    const salt=bcryptjs.genSaltSync();
    usuario.password=bcryptjs.hashSync(password, salt)
    //Guardar en DB
    await usuario.save()
    res.json({
        
        msg: 'post API-controlador',
        usuario
    });
  }
  const usuariosPut= async (req, res = response)=> {
   // const Id = new mongoose.Types(req.params.id);
    
    const     {id}   = req.params;
    const {_id, password, google, correo, ...resto }=req.body;
    //console.log(id)
    //const _id = new mongoose.Types.ObjectId(req.body._id);
    
    
    if(password){
      const salt=bcryptjs.genSaltSync();
      resto.password=bcryptjs.hashSync(password, salt)
    }
   
  
    const usuario=await Usuario.findByIdAndUpdate( id, resto);
    res.json(usuario)
    
  }
  const usuariosDel=async(req, res=response)=> {
    const {id}=req.params;
    //const usuario=await Usuario.findByIdAndDelete(id)
    const usuario=await Usuario.findByIdAndUpdate(id,{estado:false})
    res.json(usuario)
  }
  const usuariosPatch=(req, res=response)=> {
    res.json({
        
        msg: 'patch API-controlador'
    });
  }



module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDel
}