import React,{Fragment,useContext} from 'react';
import Tarea from './Tarea'
import ProyectoContext from '../../context/proyectos/ProyectoContext'
import TareasContext from '../../context/tareas/TareasContext'
import {CSSTransition,TransitionGroup} from 'react-transition-group'

const ListadoTareas = () => {


    const {proyectoActual,eliminarProyecto} = useContext(ProyectoContext)
    const {mistareas} = useContext(TareasContext)

    if(Object.keys(proyectoActual).length === 0) return <h2>Selecciona un proyecto</h2>

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                {mistareas.length === 0 ? 
                    <li className="tarea">No hay tareas para este proyecto</li>
                :
                    <TransitionGroup>
                        {mistareas.map(tarea => (
                            <CSSTransition
                                key={tarea._id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Tarea
                                    
                                    tarea = {tarea}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                    
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={()=>eliminarProyecto(proyectoActual._id)}            
            >
                Eliminar Proyecto &times;
            </button>
        </Fragment>
    );
}
 
export default ListadoTareas;