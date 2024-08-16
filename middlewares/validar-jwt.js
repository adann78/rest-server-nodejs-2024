const {request, response }=require('express')
const jwt=require('jsonwebtoken')
const Usuario=require('../models/usuario')
const validarJWT=async(req=request, res=response, next)=>{
    const token=req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'No hay token...'
        })
    }
    console.log(token);

    try{

       const { uid }= jwt.verify(token, process.env.SECRETORPRIVATEKEY)
       //leer el usuario que corresponde al ui
       const usuario=await Usuario.findById( uid );
       //console.log(usuario)
       if( !usuario ){
        return res.status(404).json({
            msg:'Token no valido, usuario borrado de BD'
        })
       }
       
       if( !usuario.estado ){
        return res.status(401).json({
            msg: 'Token no valido-usuario en false'
        })
       }
       req.usuario=usuario
    next();
    }catch(error){
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })

    }
    

}






module.exports={
    validarJWT
}