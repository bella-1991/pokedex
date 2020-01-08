import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions/actions'
import PokeGrid from '../pokeGrid/pokeGrid'
import './more-pokes.css'

class MorePokes extends Component {
    morePoke = _ => {
        const { filters } = this.props
        
        filters.defaultRPP = filters.defaultRPP + 10
        this.props.dispatch(actions.morePoke(filters))
    }
    
    render () {
        const { currentResults, numberOfResults } = this.props

        return (
            <div className="pokedex__more-pokes">                
                { currentResults && currentResults.length !== numberOfResults ? (
                    <button className="pokedex__more-button" onClick={this.morePoke}>Load next set of Pokes</button>
                ): null }                
            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        filters: state.pokedexReducer.filters,
        currentResults: state.pokedexReducer.results.filteredResults,
        numberOfResults: state.pokedexReducer.results.numberOfResults
    }
})(MorePokes)