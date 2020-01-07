import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions/actions'
import './poke-header.css'

class PokeHeader extends Component {
    clearPoke = _ => this.props.dispatch(actions.clearPoke())

    render () {
        const { selectedPoke } = this.props

        return (
            <header className="pokedex__header">                
                {selectedPoke ? (
                    <h1 className="pokedex__heading">
                        { selectedPoke.name }
                        <button className="pokedex__back-button" onClick={this.clearPoke}>Back</button>
                    </h1>
                ):( 
                    <h1 className="pokedex__heading">Pokedex</h1> 
                )}
            </header>
        )
    }
}

export default connect((state, props) => {
    return {
        selectedPoke: state.pokedexReducer.selectedPoke
    }
})(PokeHeader)