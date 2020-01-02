import React, { Component } from 'react'
import './poke-grid.css'

const sortOptions = [
    {
        code: 'ASCE',
        value: 'Ascending'
    },
    {
        code: 'DESC',
        value: 'Descending'
    }
]

export default class PokeGrid extends Component {
    selectedPoke = poke => {
        this.props.selectedPoke(poke)
    }

    handleSortChange = sort => {
        this.props.handleSortChange(sort)
    }
    
    handleTypeChange = type => {
        this.props.handleTypeChange(type)
    }

    render () {
        const { sprites, defaultSort, filterTypes, defaultType } = this.props

        return (
            <div className="pokedex__grid">
                <div className="pokedex__grid-filter">
                    <div className="pokedex__grid-filter-container">
                        <label className="pokedex__grid-label">Filter By Type</label>
                        <select value={defaultType} onChange={e => this.handleTypeChange(e.target.value)} className="pokedex__grid-select">
                            <option value="ALL"> --All-- </option>
                            {
                                filterTypes.map((option, key) => 
                                    <option key={key} value={option.name}>{option.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="pokedex__grid-filter-container">
                        <label className="pokedex__grid-label">Sort</label>
                        <select value={defaultSort} onChange={e => this.handleSortChange(e.target.value)} className="pokedex__grid-select">
                            {
                                sortOptions.map((option, key) => 
                                    <option key={key} value={option.code}>{option.value}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
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