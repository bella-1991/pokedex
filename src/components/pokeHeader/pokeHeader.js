import React, { Component } from 'react'
import './poke-header.css'

export default class PokeHeader extends Component {
    clearPoke = _ => {
        this.props.clearPoke()
    }

    render () {
        const props = this.props

        return (
            <header className="pokedex__header">                
                {
                    props.selectedPoke ?
                    <h1 className="pokedex__heading">
                        { props.selectedPoke.name }
                        <button className="pokedex__back-button" onClick={this.clearPoke}>Back</button>    
                    </h1>     
                    : <h1 className="pokedex__heading">Pokedex</h1>
                }
            </header>
        )
    }
}