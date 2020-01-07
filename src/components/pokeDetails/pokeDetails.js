import React, { Component } from 'react'
import { connect } from 'react-redux'

import PokeImage from './pokeImage'
import PokeKeyFacts from './pokeKeyFacts'
import PokeAbilities from './pokeAbilities'
import PokeProgressBar from './pokeProgressBar'
import './poke-details.css'

class PokeDetails extends Component {
    render () {
        const { selectedPoke } = this.props
        
        return (
            <div className="pokedex__details-container">
                <PokeImage id={selectedPoke.id} name={selectedPoke.name} />
                <PokeKeyFacts weight={selectedPoke.weight} types={selectedPoke.types} height={selectedPoke.height} />
                <div className="pokedex__grid-container">
                    <div className="pokedex__details-grid">
                        <div className="pokedex__detilas-group">
                            <label className="pokedex__details-label">Name: </label>
                            <span className="pokedex__details-info">{ selectedPoke.name }</span>
                        </div>
                        <div className="pokedex__detilas-group">
                            <label className="pokedex__details-label">Base Experience: </label>
                            <span className="pokedex__details-info">{ selectedPoke.base_experience }</span>
                        </div>
                        <div className="pokedex__detilas-group pokedex__detilas-group--block">
                            <label className="pokedex__details-label">Abilities: </label>
                            <table className="pokedex__details-table">
                                <thead>
                                    <tr>
                                        <th>name</th>
                                        <th>hidden</th>
                                        <th>slot</th>
                                    </tr>
                                </thead>
                                <PokeAbilities abilities={selectedPoke.abilities} />
                            </table>
                        </div>
                    </div>
                    <div className="pokedex__details-grid">
                        <div className="pokedex__detilas-group pokedex__detilas-group--block">
                            <label className="pokedex__details-label">Abilities: </label>
                            <PokeProgressBar stats={selectedPoke.stats} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state, props) => {
    return { 
        selectedPoke: state.pokedexReducer.selectedPoke
    }
})(PokeDetails)