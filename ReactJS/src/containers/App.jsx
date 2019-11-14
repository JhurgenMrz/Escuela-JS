import React,{useState, useEffect} from 'react'
import '../assets/styles/App.scss'
import {useInitialState} from '../hooks/useInitialState'
import {Header} from '../components/Header'
import { Search} from '../components/Search'
import {Categories} from '../components/Categories'
import {Carousel} from '../components/Carousel'
import {CarouselItem} from '../components/CarouselItem'
import {Footer} from '../components/Footer'

const API = 'http://localhost:3000/initialState'
export const App =()=>{

    const initialState = useInitialState(API)

    
    return <div>
        <Header/>
        <Search/>
        {
            initialState.mylist.length > 0 && (
            <Categories title="Mi Lista">
            <Carousel>
                {
                    initialState.mylist.map(item=> (
                        <CarouselItem key={item.id} {...item} />
                    ))
                }
            </Carousel>
            </Categories>
        )}
        <Categories title="Tendencias">
            <Carousel>
                {
                    initialState.trends.map(item=> (
                        <CarouselItem key={item.id} {...item} />
                    ))
                }
            </Carousel>
        </Categories>
        <Categories title="Populares">
            <Carousel>
                {   
                    initialState.originals.map(item=> (
                        <CarouselItem key={item.id} {...item} />
                    ))
                }
            </Carousel>
        </Categories>
        <Footer/>

    </div>
}