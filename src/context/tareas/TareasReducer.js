
import {
    TAREAS_PROYECTOS,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    EDITAR_TAREA
} from '../../types'

export default (state, action) => {
    switch(action.type){
        case TAREAS_PROYECTOS:
            return {
                ...state,
                mistareas: action.payload
            }
        case AGREGAR_TAREA:
            return {
                ...state,
                mistareas: [action.payload,...state.tareas],
                errortarea:false
            }
        case VALIDAR_TAREA:
            return {
                ...state,
                errortarea:true
            }
        case ELIMINAR_TAREA:
            return{
                ...state,
                tareas: state.tareas.filter( tarea => tarea._id !== action.payload)
            }
        case EDITAR_TAREA:
        case ESTADO_TAREA:
            return{
                ...state,
                tareas: state.tareas.map(tarea => tarea.id === action.payload.id ? 
                    action.payload : tarea),
                tareaactual:null,
                errortarea:false
            }
        case TAREA_ACTUAL:
            return {
                ...state,
                tareaactual:action.payload
            }
        default:
            return state;
    }
}