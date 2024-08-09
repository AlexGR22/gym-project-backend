import { verifyJWT } from '../helpers/handleJwt.js'
import userModel from '../models/userModel.js'


const checkRole = (roles) => async (req, res, next) => {
    try {
        const token = req.cookies.token; // Obtener el token JWT de las cookies de la solicitud
        console.log(token);
        
        const verifyToken = await verifyJWT(token); // Verificar el token JWT

        if (!verifyToken) {
            // Si el token no es válido o no existe
            res.clearCookie('token'); // Borrar la cookie del token
            res.render('login', { mensaje: 'Su sesión ha caducado, vuelva a loguearse' }); // Mostrar un mensaje de inicio de sesión caducada
        } else {
            // Si el token es válido
            const userDetail = await userModel.findById(verifyToken._id); // Buscar en la base de datos el detalle del usuario correspondiente al ID almacenado en el token
            req.user = userDetail; // Asignar el detalle del usuario al objeto req para que esté disponible en los siguientes middlewares o controladores
            const { role } = userDetail; // Obtener el rol del usuario
            console.log(`el rol es ${role}`);
            if ([].concat(roles).includes(role)) {
                // Si el rol del usuario está incluido en el arreglo de roles permitidos
                next(); // Pasar al siguiente middleware o controlador
            } else {
                // Si el rol del usuario no está incluido en el arreglo de roles permitidos
                res.status(409);
                res.render('error', { mensaje: 'Usted no cuenta con los permisos suficientes para acceder a esta página' }); // Mostrar un mensaje de error indicando que el usuario no tiene los permisos suficientes
            }
        }
    } catch (e) {
        // Si ocurre algún error durante el proceso de autenticación o autorización
        console.log('___Error rolAuth___');
        res.status(409);
        res.send({ error: 'Algo sucedio en el middleware roleAuth' }); // Mostrar un mensaje de error genérico
    }
};


export {checkRole}