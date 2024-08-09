import jwt from 'jsonwebtoken';
const CLAVEJWT = process.env.CLAVEJWT;

// Generar un token JWT basado en el detalle del cliente
const generarJWT = async (cliente) => {

    console.log(CLAVEJWT);

    return jwt.sign(
        {
            _id: cliente._id,
            role: cliente.role
        },
        CLAVEJWT,
        {
            expiresIn: '30m' // Expiración del token en 30 minutos
        }
    );

}

// Verificar un token JWT y devolver su contenido si es válido
const verifyJWT = async (token) => {
    console.log(token);
    
    try {
        return jwt.verify(token, CLAVEJWT);
    } catch (e) {
        // 
        console.log('__Algo fallo___', e)
        return null
    }
}


export {
    generarJWT,
    verifyJWT
}