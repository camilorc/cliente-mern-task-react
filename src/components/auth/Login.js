import React,{useState,useContext,useEffect} from 'react'
import {Link} from 'react-router-dom'
import alertaContext from '../../context/alertas/AlertaContext'
import AuthContext from '../../context/auth/authContext'

const Login = (props) => {

    const [usuario,guardarUsuario] = useState({
        email:'',
        password:''
    })

    const {alerta,mostrarAlerta} = useContext(alertaContext)
    const {mensaje,autenticado,iniciarSesion} = useContext(AuthContext)

    const {email,password} = usuario

    useEffect(()=>{

        //Comprobamos si hay mensaje de error del BACK
        if(mensaje){
            mostrarAlerta(mensaje.msg,mensaje.categoria)
            return;
        }

        if(autenticado){
            props.history.push('/proyectos')
        }
        // eslint-disable-next-line
    },[mensaje,autenticado,props.history])

    const onChange = e =>{
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        //Comprobamos
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios','alerta-error')
            return;
        }

        iniciarSesion({email,password})

    }


    return (  
        <div className="form-usuario">
            {alerta ?  <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>: null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>
                <form
                    onSubmit={handleSubmit}
                >
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
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block" 
                            value="Iniciar Sesión"
                        />
                    </div>
                </form>
                <Link to="/nueva-cuenta" className="enlace-cuenta">
                    Obtener Cuenta
                </Link>
            </div>
        </div>
    );
}
 
export default Login;