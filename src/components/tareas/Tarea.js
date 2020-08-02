import React,{useContext} from 'react'
import TareasContext from '../../context/tareas/TareasContext'
import ProyectoContext from '../../context/proyectos/ProyectoContext'

const Tarea = ({tarea}) => {

    const {eliminarTarea,obtenerTareas,cambiarEstadoTarea,activarTarea} = useContext(TareasContext)
    const {proyectoActual} = useContext(ProyectoContext)

    const onClickEliminar = id => {
        eliminarTarea(id)
        obtenerTareas(proyectoActual._id)
    }

    const cambiarEstado = tarea => {
        if(tarea.estado){
            tarea.estado = false
        }else{
            tarea.estado = true
        }

        cambiarEstadoTarea(tarea)
    }

    const activarTareaActual = tarea => {
        activarTarea(tarea)
    }

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado ?
                    <button
                        type="button"
                        className="completo"
                        onClick={()=>cambiarEstado(tarea)}
                    >
                        Completo
                    </button>
                :
                    <button
                        type="button"
                        className="incompleto"
                        onClick={()=>cambiarEstado(tarea)}
                    >
                        Incompleto
                    </button>
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={()=>activarTareaActual(tarea)}
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick = {() => onClickEliminar(tarea._id)}
                >
                    Eliminar
                </button>
            </div>
        </li>
     );
}
 
export default Tarea;