import React, {useState} from 'react'
import {connect} from 'react-redux'
import {registerRequest} from '../actions'
import { Link } from "react-router-dom";
import Header from '../components/Header'
import '../assets/styles/components/Register.scss'

const Register = props => {

    const [form, setValues] = useState({
        email: '',
        name: '',
        password: ''
    })

    const handleInput = event => {
        setValues({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        console.log(form);
        props.registerRequest(form)
        props.history.push('/')
    }

    return (
        <>
        <Header isRegister/>
    <section className="register">
        <section className="register__container">
            <h2>Regístrate</h2>
            <form className="register__container--form" onSubmit={handleSubmit}>
                <input 
                    className="input" 
                    type="text" 
                    placeholder="Nombre"
                    onChange={handleInput}
                    name="name"
                />
                <input 
                    className="input" 
                    type="text" 
                    placeholder="Correo" 
                    onChange={handleInput} 
                    name="email"
                />
                <input 
                    className="input"  
                    type="password" 
                    placeholder="Contraseña"
                    onChange={handleInput}
                    name="password"
                />
                <button className="button">Registrarme</button>
            </form>
            <Link to="/login">
                Iniciar sesión
            </Link>
        </section>
    </section>
    </>
    )
}

const mapDispatchToProps = {
    registerRequest
}


export default connect(null,mapDispatchToProps)(Register)