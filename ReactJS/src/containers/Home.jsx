import React from 'react'
import {connect} from 'react-redux'
import '../assets/styles/App.scss'
import { Search} from '../components/Search'
import {Categories} from '../components/Categories'
import {Carousel} from '../components/Carousel'
import CarouselItem from '../components/CarouselItem'


const Home =({mylist, trends, originals})=>{
    
    return <>
        <Search/>
        {
            mylist.length > 0 && (
            <Categories title="Mi Lista">
            <Carousel>
                {
                    mylist.map(item=> (
                        <CarouselItem 
                            key={item.id} 
                            {...item}  
                            isList
                        />
                    ))
                }
            </Carousel>
            </Categories>
        )}
        <Categories title="Tendencias">
            <Carousel>
                {
                    trends.map(item=> (
                        <CarouselItem 
                            key={item.id} 
                            {...item} 
                            isList={false}
                        />
                    ))
                }
            </Carousel>
        </Categories>
        <Categories title="Populares">
            <Carousel>
                {   
                    originals.map(item=> (
                        <CarouselItem 
                            key={item.id} 
                            {...item} 
                            isList={false}
                        />
                    ))
                }
            </Carousel>
        </Categories>
    </>
}

const mapStateToProps = (state) => {
    return {
        mylist: state.mylist,
        trends: state.trends,
        originals: state.originals
    }
}

export default connect(mapStateToProps, null)(Home);
