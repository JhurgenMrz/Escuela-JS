import React from 'react'
import '../assets/styles/components/Header.scss'

export const Header = ()=>(
    <header classNmae="header">
    <img classNmae="header__img" src="../assets/logo-platzi-video-BW2.png" alt="Platzi Video" />
    <div classNmae="header__menu">
      <div classNmae="header__menu--profile">
        <img src="../assets/user-icon.png" alt=""/>
        <p>Perfil</p>
      </div>
      <ul>
        <li><a href="/">Cuenta</a></li>
        <li><a href="/">Cerrar Sesión</a></li>
      </ul>
    </div>
  </header>
)