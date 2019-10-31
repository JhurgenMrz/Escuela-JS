import React from 'react'

export const Carousel = ({children})=>(
    <section class="carousel">
        <div class="carousel__container">
        {
            children
        }
        </div>
    </section>
);