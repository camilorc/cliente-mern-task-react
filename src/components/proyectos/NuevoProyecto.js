import React,{Fragment,useState,useContext} from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext'

const NuevoProyecto = () => {

    const {formulario,errorformulario,mostrarFormulario,agregarProyecto,mostrarError} = useContext(ProyectoContext)

    const [proyecto,guardarProyecto] = useState({
        nombre:''
    })

    const {nombre} = proyecto

    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    const onSubmitProyecto = e => {
        e.preventDefault()

        if(nombre === ''){
            mostrarError()
            return;
        }

        agregarProyecto(proyecto)

        guardarProyecto({
            nombre: ''
        })
        
    }

    return (  
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={()=>mostrarFormulario()}
            >Nuevo Proyecto</button>
            
            {formulario ? 
                <form
                    className="formulario-nuevo-proyecto"
                    onSubmit={onSubmitProyecto}
                >
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Proyecto"
                        name="nombre"
                        value={nombre}
                        onChange={onChangeProyecto}
                        
                    />

                    <input 
                        type="submit"
                        className="btn btn-block btn-primario"
                        value="Crear Proyecto"
                    />
                </form>
            
            :null
            }
            {errorformulario ? <p className="mensaje error">Nombre proyecto obligatorio</p>: null}
        </Fragment>
    );
}
 
export default NuevoProyecto;