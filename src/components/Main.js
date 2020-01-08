import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../actions/actions'
import PokeHeader from './pokeHeader/pokeHeader'
import PokeFilter from './pokeFilters/pokeFilter'
import PokeGrid from './pokeGrid/pokeGrid'
import PokeDetails from './pokeDetails/pokeDetails'
import MorePokes from './morePokes/morePokes'
import PokeOverlay from './pokeOverlay/pokeOverlay'
import './main.css'

class Main extends Component {
    componentDidMount() {
        this.props.dispatch(actions.initialisePokedex())
    }

    render() {
        const { selectedPoke, overlay, morePokes, pokeError } = this.props

        return (    
            <div className="pokedex">
                <PokeHeader />
                { selectedPoke ? (
                        <PokeDetails />   
                ):( <>
                        <PokeFilter />
                        {!pokeError ? (
                            <>
                                <PokeGrid />
                                { morePokes && <MorePokes /> }  
                            </>
                        ):(
                                <span>{pokeError}</span>
                        )}
                        
                    </>
                )}    
                { overlay && <PokeOverlay /> }
            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        selectedPoke: state.pokedexReducer.selectedPoke,        
        overlay: state.pokedexReducer.overlay,
        morePokes: state.pokedexReducer.morePokes,
        pokeError: state.pokedexReducer.pokeError,
        pages: state.pokedexReducer.pages
    }
})(Main)