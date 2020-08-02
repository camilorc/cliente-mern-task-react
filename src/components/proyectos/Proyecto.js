import React,{useContext} from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext'
import TareasContext from '../../context/tareas/TareasContext'

const Proyecto = ({proyecto}) => {

    const {cambiarProyectoActual} = useContext(ProyectoContext)
    const {obtenerTareas} = useContext(TareasContext)

    const onClickProyecto = () => {
        cambiarProyectoActual(proyecto._id);
        obtenerTareas(proyecto._id)
    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={onClickProyecto}

            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;