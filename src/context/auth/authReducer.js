import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION

} from '../../types/index'

export default (state,action) => {
    switch(action.type){
        case LOGIN_EXITOSO:
        case REGISTRO_EXITOSO:
            localStorage.setItem('token',action.payload.token)
            return{
                ...state,
                autenticado:true,
                mensaje:null,
                cargando:true
            }
        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token')
            return{
                ...state,
                token:null,
                autenticado:false,
                usuario:null,
                mensaje:action.payload,
                cargando:false
            }
        case OBTENER_USUARIO:
            return{
                ...state,
                autenticado:true,
                usuario: action.payload.usuario,
                cargando:true
            }
        default:
            return state;
    }
}