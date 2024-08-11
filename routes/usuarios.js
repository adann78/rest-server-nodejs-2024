const { Router }=require('express');
const { check }=require('express-validator')
const { usuariosGet,usuariosPost,usuariosPut,usuariosDel,usuariosPatch } = require('../controllers/usuarios');
const {esRoleValido, emailExiste, existeUsuarioPorId}=require('../helpers/db-validators')

const { validarCampos } = require('../middlewares/validar-campos');
const router=Router()

router.get( '/', usuariosGet ); 

router.put('/:id', [
  check('id', 'No es un Id válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom(esRoleValido),
  validarCampos
], usuariosPut); 
router.post( '/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe tener mas de 6 letras').isLength({min: 6}),
  check('correo', 'El correo no es valido').isEmail(),
  //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('correo').custom(emailExiste),
  check('rol').custom( esRoleValido ),
  validarCampos

], usuariosPost ); 
router.delete( '/:id',[check('id', 'No es un Id válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos

], usuariosDel ); 
router.patch( '/', usuariosPatch ); 
    
  
  
  module.exports=router;