import React,{useReducer} from 'react'
import proyectoContext from './ProyectoContext'
import proyectoReduce from './ProyectoReduce'
import clienteAxios from '../../config/axios'
import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTOS,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
} from '../../types'


const ProyectoState = props => {

    const initialState = {
        formulario: false,
        proyectos: [],
        errorformulario: false,
        proyectoActual:{}
    }

    //Dispatch para ejecutar las acciones
    //Recibe el Reducer y luego el state inicial. Devuelte un state y las funciones (dispatch)
    const [state, dispatch] = useReducer(proyectoReduce, initialState)

    const mostrarFormulario = () => {
        dispatch({
            type:FORMULARIO_PROYECTO
        })
    }

    const obtenerProyectos = async () => {

        try {
            
            const respuesta = await clienteAxios.get('/api/proyectos')
            dispatch({
                type:OBTENER_PROYECTOS,
                payload:respuesta.data.proyectos
            })

        } catch (error) {
            console.log(error)
        }

        
    }

    const mostrarError = () => {
        dispatch({
            type:VALIDAR_FORMULARIO
        })
    }

    const agregarProyecto = async (proyecto) => {

        try {

            const respuesta = await clienteAxios.post('/api/proyectos',proyecto)
            console.log(respuesta)
            dispatch({
                type:AGREGAR_PROYECTOS,
                payload:respuesta.data
            })
            
        } catch (error) {
            console.log(error.response)
        }

    }

    const cambiarProyectoActual = async (id) => {

        try {
            dispatch({
                type:PROYECTO_ACTUAL,
                payload:id
            })

        } catch (error) {
            console.log(error.response)
        }
    }

    const eliminarProyecto = async id => {

        try {
            
            await clienteAxios.delete(`/api/proyectos/${id}`)

            dispatch({
                type:ELIMINAR_PROYECTO,
                payload:id
            })

        } catch (error) {
            console.log(error.response)
        }
        
    }

    return ( 
        <proyectoContext.Provider
            value={{
                formulario: state.formulario,
                proyectos: state.proyectos,
                errorformulario: state.errorformulario,
                proyectoActual: state.proyectoActual,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                cambiarProyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
     );
}
 
export default ProyectoState;