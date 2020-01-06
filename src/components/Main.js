import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../actions/actions'
import PokeHeader from './pokeHeader/pokeHeader'
import PokeGrid from './pokeGrid/pokeGrid'
import PokeDetails from './pokeDetails/pokeDetails'
import PokeOverlay from './pokeOverlay/pokeOverlay'
import './main.css'

class Main extends Component {
    componentWillMount() {
        this.props.dispatch(actions.fetchAllPokes(this.props.defaultSort))
        this.props.dispatch(actions.fetchPokeTypes())
    }

    handleTypeChange = type => {
        const { defaultSort, allPokes } = this.props

        this.props.dispatch(actions.handleTypeChange(type, allPokes, defaultSort))
        this.setState()
    }

    handleSortChange = type => {
        this.props.dispatch(actions.handleSortChange(type, this.props.allPokes))
        this.setState()
    }

    selectedPoke = poke => {
        this.props.dispatch(actions.selectedPoke(poke))
    }

    clearPoke = _ => {
        this.props.dispatch(actions.clearPoke())
    }

    render() {
        const { allPokes, selectedPoke, overlay, defaultSort, sortOptions, pokeTypes, defaultType, pokeError } = this.props

        return (    
            <div className="pokedex">
                <PokeHeader selectedPoke={selectedPoke} clearPoke={this.clearPoke} />
                { 
                    selectedPoke ? 
                        <PokeDetails selectedPoke={selectedPoke} />      
                    :
                        <PokeGrid sprites={allPokes}
                                selectedPoke={this.selectedPoke}
                                defaultSort={defaultSort} 
                                defaultType={defaultType} 
                                pokeTypes={pokeTypes} 
                                sortOptions={sortOptions}
                                handleTypeChange={this.handleTypeChange}
                                handleSortChange={this.handleSortChange} />
                }
                { overlay && <PokeOverlay /> }
            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        allPokes: state.pokedexReducer.allPokes,
        pokeTypes: state.pokedexReducer.pokeTypes,
        selectedPoke: state.pokedexReducer.selectedPoke,
        defaultType: state.pokedexReducer.defaultType,
        defaultSort: state.pokedexReducer.defaultSort,
        sortOptions: state.pokedexReducer.sortOptions,
        pokeError: state.pokedexReducer.pokeError,
        overlay: state.pokedexReducer.overlay
    }
})(Main)