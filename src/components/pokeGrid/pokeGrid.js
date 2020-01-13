import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions/actions'
import './poke-grid.css'

class PokeGrid extends Component {
    selectedPoke = selectedPoke=> this.props.dispatch(actions.selectedPoke(selectedPoke))

    getSpriteId = url => {
        return `../sprites/${url.split('pokemon-species/').pop().split('/')[0]}.png`
    }

    render () {
        const { results, overlay } = this.props

        return (
            <div className="pokedex__grid"> 
                <p className="pokedex__grid-results-label">
                    { results.filteredResults && `- Showing ${results.filteredResults.length} out of ${results.numberOfResults} Results -` }
                </p>
                <div className="pokedex__grid-container">
                    { results.filteredResults && results.filteredResults.map((sprite, index) => (
                            <div className={overlay ? "pokedex__grid-item" : "pokedex__grid-item pokedex__grid-item--show"} key={index} onClick={() => this.selectedPoke(sprite.name)}>
                                <img src={this.getSpriteId(sprite.url)} alt={sprite.name} />
                                <span className="pokedex__grid-title">{sprite.name}</span>  
                                <div className="pokedex_grid-view-details">
                                    view details
                                </div>              
                            </div>
                        )
                    )}
                </div>
            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        results: state.pokedexReducer.results,
        overlay: state.pokedexReducer.overlay
    }
})(PokeGrid)