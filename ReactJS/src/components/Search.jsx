import React from 'react'
import classNames from 'classnames'
import '../assets/styles/components/Search.scss'

export const Search = ({isHome})=>{
    const inputStyle = classNames('input',{
      isHome
    })

    return(
      <section className="main">
        <h2 className="main__title">¿Qué quieres ver hoy?</h2>
        <input type="text" className={inputStyle} placeholder="Buscar..." />
      </section>
)}