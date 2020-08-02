import React,{useContext,useState} from 'react'
import ProyectoContext from '../../context/proyectos/ProyectoContext'
import TareasContext from '../../context/tareas/TareasContext'
import { useEffect } from 'react';


const FormTarea = () => {

    const [tareanueva,setTareaNueva] = useState({
        nombre:''
    })

    const {nombre} = tareanueva

    const {proyectoActual} = useContext(ProyectoContext)
    const {errortarea,tareaactual,agregarTarea,obtenerTareas,validarTarea,editarTarea} = useContext(TareasContext)

    useEffect(()=>{
        if(tareaactual !== null){
            setTareaNueva(tareaactual)
        }else{
            setTareaNueva({
                nombre:''
            })
        }
    },[tareaactual])

    if(Object.keys(proyectoActual).length === 0) return null

    const handleChange = e => {
        setTareaNueva({
            ...tareanueva,
            [e.target.name] : e.target.value
        })
    }

    const onSubmitNuevaTarea = e => {
        e.preventDefault()
        //Comprobamos que no este vacia
        if(nombre.trim() === ''){
            validarTarea()
            return;
        }

        if(tareaactual !== null){

            editarTarea(tareanueva)
        }else{
            
            tareanueva.estado=false
            tareanueva.proyecto = proyectoActual._id
            agregarTarea(tareanueva)
        }

        obtenerTareas(proyectoActual._id)


        setTareaNueva({
            nombre:''
        })
    }

    

    return (  
        <div className="formulario">
            <form
                onSubmit={onSubmitNuevaTarea}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre tarea"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-block"
                        value={tareaactual ? 'Editar Tarea': "Agregar tarea"}

                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">El campo de nombre Tarea es obligatorio</p>: null}
        </div>
    );
}
 
export default FormTarea;