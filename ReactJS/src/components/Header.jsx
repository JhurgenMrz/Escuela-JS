import React from 'react'
import {connect} from 'react-redux'
import {logoutRequest} from '../actions'
import {Link} from 'react-router-dom'
import {gravatar} from '../utils/gravatar'
import '../assets/styles/components/Header.scss'
import logo from '../assets/static/logo-platzi-video-BW2.png'
import userIcon from '../assets/static/user-icon.png'


const Header = props =>{

  const { user } = props

  const hasUser = Object.keys(user).length > 0


  const handleLogout = ()=>{
    props.logoutRequest({})
  }

  return (
    <header className="header">
      <Link to="/">
        <img className="header__img" src={logo} alt="Platzi Video" />
      </Link>
      <div className="header__menu">
        <div className="header__menu--profile">
          {
            hasUser ? (
              <img src={gravatar(user.email)} alt={user.email} />
            ) : (
              <img src={userIcon} alt="" />
            ) 
            }
          <p>Perfil</p>
        </div>
        <ul>
          {
            hasUser ? (
              <li><Link to="/" onClick={handleLogout}>Cerrar Sesion</Link></li>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )
          }
        </ul>
      </div>
    </header>
  );}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logoutRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)