import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions/actions'
import './poke-filter.css'

class PokeFilters extends Component {
    handleGenChange = type => {
        const { filters } = this.props
        
        filters.defaultGeneration = type
        this.props.dispatch(actions.handleGenChange(filters))
    }

    handleTypeChange = type => { 
        const { filters } = this.props

        filters.defaultType.indexOf(type) === -1 ? (
            filters.defaultType.push(type)
        ):(
            filters.defaultType.splice(filters.defaultType.indexOf(type), 1)
        )        

        this.props.dispatch(actions.handleTypeChange(filters))
    }

    checkStatus = name => {
        let checked

        this.props.filters.defaultType.indexOf(name) === -1 ? checked = false : checked = true
        return checked
    }

    handleSortChange = type => {
        const { filters } = this.props
        
        filters.defaultSort = type
        this.props.dispatch(actions.handleSortChange(filters))
    }
    
    handleRPPChange = type => {   
        console.log(type)     
        const { filters } = this.props
        
        filters.defaultRPP = type
        this.props.dispatch(actions.handleRPPChange(filters))
    }

    render () {
        const { filterOptions, filters } = this.props

        return (
            <div className="pokedex__filters">
                <div className="pokedex__filters-container pokedex__filters-container--fullwidth">
                    <div className="pokedex__grid-filter-container">
                        <label className="pokedex__grid-label">Generation</label>
                        <select value={filters.defaultGeneration} onChange={e => this.handleGenChange(e.target.value)} className="pokedex__grid-select">
                            {filterOptions.generations.map((option, key) => (
                                    <option key={key} value={option.name}>{option.name}</option>
                                )
                            )}
                        </select>
                    </div>
                    <div className="pokedex__grid-filter-container">
                        <label className="pokedex__grid-label">Type</label>
                        <div className="pokedex__filters-checkbox-group">
                            {
                                filterOptions.types
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .map((option, key) => (
                                        <label className="pokedex__filters-checkbox" key={key}>
                                            <span className="pokedex__filters-checkbox-label">{option.name}</span>
                                            <input type='checkbox' 
                                                    id={option.name + key} 
                                                    onChange={() => this.handleTypeChange(option.name)} 
                                                    checked={this.checkStatus(option.name)}
                                                    className="pokedex__filters-checkbox-input" />
                                            <span className="pokedex__filters-checkbox-checkmark"></span>
                                        </label>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="pokedex__filters-container">
                    <div className="pokedex__grid-filter-container">
                        <label className="pokedex__grid-label">Sort</label>
                        <select value={filters.defaultSort} onChange={e => this.handleSortChange(e.target.value)} className="pokedex__grid-select">
                            {filterOptions.sort.map((option, key) => (
                                    <option key={key} value={option.code}>{option.value}</option>
                                )
                            )}
                        </select>
                    </div>
                    <div className="pokedex__grid-filter-container">
                        <label className="pokedex__grid-label">Show Results</label>
                        <select value={filters.defaultRPP} onChange={e => this.handleRPPChange(e.target.value)} className="pokedex__grid-select">
                            {filterOptions.resultsPerPage.map((option, key) => (
                                <option key={key} value={option.value}>{option.value}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        filterOptions: state.pokedexReducer.filterOptions,
        filters: state.pokedexReducer.filters,        
        pokeOfTypes: state.pokedexReducer.pokeOfTypes,
    }
})(PokeFilters)