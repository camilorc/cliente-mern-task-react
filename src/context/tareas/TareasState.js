import React,{useReducer} from 'react'
import TareasContext from './TareasContext'
import TareasReducer from './TareasReducer'
import clienteAxios from '../../config/axios'

import {
    TAREAS_PROYECTOS,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    EDITAR_TAREA
} from '../../types'

const TareasState = props => {

    const initialState = {
        tareas:[],
        mistareas:[],
        errortarea:false,
        tareaactual:null
    }

    const [state,dispatch] = useReducer(TareasReducer,initialState)

    //Funciones

    //Obtener las tareas de un proyecto en especifico
    const obtenerTareas = async proyecto => {

        try {
            
            const respuesta = await clienteAxios.get('api/tareas',{params:{proyecto}})

            dispatch({
                type:TAREAS_PROYECTOS,
                payload: respuesta.data.tareas
            })

        } catch (error) {
            console.log(error.response)
        }
    }

    //Agregamos una tarea
    const agregarTarea = async tarea => {
        
        try {

            const respuesta = await clienteAxios.post('/api/tareas',tarea)
            console.log(respuesta)

            dispatch({
                type: AGREGAR_TAREA,
                payload:respuesta.data.tarea
            })
            
        } catch (error) {
            console.log(error.response)
        }


        
    }

    //Validamos una tarea
    const validarTarea = () => {
        dispatch({
            type:VALIDAR_TAREA
        })
    }

    //Eliminamos una tarea por ID
    const eliminarTarea = async (tareaID) => {

        try {

            const respuesta = await clienteAxios.delete(`/api/tareas/${tareaID}`)
            console.log(respuesta)

            dispatch({
                type:ELIMINAR_TAREA,
                payload:tareaID
            })
            
        } catch (error) {
            console.log(error.response)
        }


        
    }

    //Cambier el estado de la tarea
    const cambiarEstadoTarea = async tarea =>{
        try {
            
            const respuesta = await clienteAxios.put(`/api/tareas/${tarea._id}`,tarea)
            console.log(respuesta)
            dispatch({
                type:ESTADO_TAREA,
                payload:tarea
            })

        } catch (error) {
            console.log(error.response)
        }
    }

    //Colocamos como activa una tarea para editar
    const activarTarea = tarea => {
        dispatch({
            type:TAREA_ACTUAL,
            payload:tarea
        })
    }

    //Editamo una Tarea
    const editarTarea = async tarea => {
        try {
            
            const respuesta = await clienteAxios.put(`/api/tareas/${tarea._id}`,tarea)
            console.log(respuesta)
            dispatch({
                type:EDITAR_TAREA,
                payload:tarea
            })

        } catch (error) {
            console.log(error.response)
        }
    }

    return ( 
        <TareasContext.Provider
            value={{
                tareas: state.tareas,
                mistareas: state.mistareas,
                errortarea:state.errortarea,
                tareaactual:state.tareaactual,
                validarTarea,
                obtenerTareas,
                agregarTarea,
                eliminarTarea,
                cambiarEstadoTarea,
                activarTarea,
                editarTarea
            }}
        >
            {props.children}
        </TareasContext.Provider>

     );
}
 
export default TareasState;