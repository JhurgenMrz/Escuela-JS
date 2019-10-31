import React from 'react'

export const Categories = ({children})=> (
    <div className="categories">
        <h3 className="categories__title">Mi lista</h3>
        {
            children
        }
    </div>
)