import React, { Component } from 'react'
import './poke-overlay.css'

export default class PokeOverlay extends Component {
    clearPoke = _ => {
        this.props.clearPoke()
    }

    render () {
        const props = this.props

        return (
            <div className="pokedex__overlay">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }
}