import React,{useState,useContext,useEffect} from 'react'
import {Link} from 'react-router-dom'
import alertaContext from '../../context/alertas/AlertaContext'
import AuthContext from '../../context/auth/authContext'

const NuevaCuenta = (props) => { //Agregamos Props pq usamos react-router-dom
    const [usuario,guardarUsuario] = useState({
        nombre:'',
        email:'',
        password:'',
        confirmar:''
    })

    const {alerta,mostrarAlerta} = useContext(alertaContext)
    const {mensaje,autenticado,registrarUsuario} = useContext(AuthContext)

    const {nombre,email,password,confirmar} = usuario

    useEffect(()=>{

        if(mensaje){
            mostrarAlerta(mensaje.msg,mensaje.categoria)
            return;
        }

        if(autenticado){
            props.history.push('/proyectos')
        }

        // eslint-disable-next-line
    },[autenticado,mensaje,props.history])

    const onChange = e =>{
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        
        e.preventDefault();

        //Validamos que no vengan vacio
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' 
        || confirmar.trim() === ''){
            mostrarAlerta('Todos los campos son Obligatorios','alerta-error')
            return;
        }

        //Password mínimo 6 caracteres
        if(password.length < 6){
            mostrarAlerta('Password mínimo de 6 caracteres','alerta-error')
            return;
        }

        //Password iguales
        if(password !== confirmar){
            mostrarAlerta('Password deben ser iguales','alerta-error')
            return;
        }

        //Registramos al usuario
        registrarUsuario({nombre,email,password});

    }


    return (  
        <div className="form-usuario">
            {alerta ?  <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>: null}
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirma tu confirmar</label>
                        <input 
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Vuelve a escribir tu password"
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block" 
                            value="Crear Cuenta Nueva"
                        />
                    </div>
                </form>
                <Link to="/" className="enlace-cuenta">
                    Volver a iniciar sesión
                </Link>
            </div>
        </div>
    );
}
 
export default NuevaCuenta;