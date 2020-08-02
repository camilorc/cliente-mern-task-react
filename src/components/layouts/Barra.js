import React,{useContext} from 'react';
import AuthContext from '../../context/auth/authContext'

const Barra = () => {

    const {usuario,cerrarSesion} = useContext(AuthContext)

    return ( 
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span> </p>: null}
            <nav className="nav-principal">
                <button
                    className='btn btn-blank cerrar-sesion'
                    onClick={()=>cerrarSesion()}
                >
                    Cerrar sesión 
                </button>
            </nav>
        </header>
     );
}
 
export default Barra;