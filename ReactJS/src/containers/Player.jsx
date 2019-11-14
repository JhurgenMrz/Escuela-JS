import React,{useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {getVideoSourse} from '../actions'
import '../assets/styles/components/Player.scss'

const Player = props => {
    const {id} = props.match.params

    const [loading, setLoading] = useState(true)

    const hasPlaying = Object.keys(props.playing).length > 0

    useEffect(()=>{
        props.getVideoSourse(id)
        setLoading(false)
    },[])

    return !loading & hasPlaying ? (
        <div className="Player">
            <video controls autoPlay>
                <source src={props.playing.source} type="video/mp4" />
            </video>
            <div className="Player-back">
                    <button type="button" onClick={()=>props.history.goBack()}>
                        Regresar
                    </button>
            </div>
        </div>
    ) : <h3>Cargando...</h3>
}

const mapStateToProps = state => {
    return {
        playing: state.playing
    }
}

const mapDispatchToProps = {
    getVideoSourse
}

export default connect(mapStateToProps,mapDispatchToProps)(Player)