import React, { Component } from 'react'

import PokeFilter from '../pokeFilters/pokeFilter'
import './poke-grid.css'

class PokeGrid extends Component {
    selectedPoke = selectedPoke => {
        this.props.selectedPoke(selectedPoke)
    }

    handleTypeChange = type => {
        this.props.handleTypeChange(type)
    }

    handleSortChange = type => {
        this.props.handleSortChange(type)
    }

    render () {
        const { sprites, defaultSort, defaultType, pokeTypes, sortOptions } = this.props

        return (
            <div className="pokedex__grid">          
                <PokeFilter defaultSort={defaultSort} 
                            defaultType={defaultType} 
                            pokeTypes={pokeTypes} 
                            sortOptions={sortOptions}
                            handleTypeChange={this.handleTypeChange}
                            handleSortChange={this.handleSortChange} />
                <div className="pokedex__grid-container">
                    {
                        sprites.map((sprite, index) => 
                            <div className="pokedex__grid-item" key={index} onClick={() => this.selectedPoke(sprite.name)}>
                                <img src={`../sprites/${index+1}.png`} alt={sprite.name} />
                                <span className="pokedex__grid-title">{sprite.name}</span>  
                                <div className="pokedex_grid-view-details">
                                    view details
                                </div>              
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default PokeGrid