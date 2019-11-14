import React from 'react'
import '../assets/styles/App.scss'
import {Header} from '../components/Header'
import { Search} from '../components/Search'
import {Categories} from '../components/Categories'
import {Carousel} from '../components/Carousel'
import {CarouselItem} from '../components/CarouselItem'
import {Footer} from '../components/Footer'

export const App =()=>{
    return <div>
        <Header/>
        <Search/>

        <Categories>
            <Carousel>
                <CarouselItem/>
                <CarouselItem/>
                <CarouselItem/>
                <CarouselItem/>
            </Carousel>
        </Categories>
        <Footer/>

    </div>
}