import React, { useContext, useEffect } from 'react'
import Proyecto from './Proyecto'
import ProyectosContext from '../../context/proyectos/ProyectoContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ListadoProyectos = () => {

    const { proyectos, obtenerProyectos } = useContext(ProyectosContext)

    useEffect(() => {
        obtenerProyectos()
        //eslint-disable-next-line 
    }, [])

    if (proyectos.length === 0) return <p>No hay Proyectos. Comienza creando uno</p>
  
    return (

        <ul className="listado-proyectos">
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto

                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
}

export default ListadoProyectos;