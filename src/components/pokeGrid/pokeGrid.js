import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions/actions'
import './poke-grid.css'

class PokeGrid extends Component {

    componentWillMount() {
        const { defaultType, defaultSort, pages } = this.props,
            data = {
                defaultType: defaultType,
                defaultSort: defaultSort,
                pages: pages
            }

        this.props.dispatch(actions.getAllPokes(data))
    }

    selectedPoke = selectedPoke => {
        console.log(selectedPoke)
        this.props.dispatch(actions.selectedPoke(selectedPoke))
    }

    getSpriteId = url => {
        return `../sprites/${url.split('pokemon/').pop().split('/')[0]}.png`
    }

    render () {
        const { sprites } = this.props

        return (
            <div className="pokedex__grid"> 
                <div className="pokedex__grid-container">
                    { sprites.map((sprite, index) => (
                            <div className="pokedex__grid-item" key={index} onClick={() => this.selectedPoke(sprite.name)}>
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
        defaultType: state.pokedexReducer.defaultType,
        defaultSort: state.pokedexReducer.defaultSort,
        sprites: state.pokedexReducer.allPokes,
        pages: state.pokedexReducer.pages,
    }
})(PokeGrid)