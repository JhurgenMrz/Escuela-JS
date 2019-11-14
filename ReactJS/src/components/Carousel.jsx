import React from 'react'
import '../assets/styles/components/Carousel.scss'

export const Carousel = ({children})=>(
    <section className="carousel">
        <div className="carousel__container">
        {
            children
        }
        </div>
    </section>
);