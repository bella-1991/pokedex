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

        filters.defaultType = type.toString().toLowerCase()
        this.props.dispatch(actions.handleTypeChange(filters))
    }

    handleSortChange = type => {
        const { filters } = this.props
        
        filters.defaultSort = type
        this.props.dispatch(actions.handleSortChange(filters))
    }
    
    handleRPPChange = type => {        
        const { filters } = this.props
        
        filters.defaultRPP = type
        this.props.dispatch(actions.handleRPPChange(filters))
    }

    render () {
        const { filterOptions, filters } = this.props

        return (
            <div className="pokedex__grid-filter">
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
                    <select value={filters.defaultType} onChange={e => this.handleTypeChange(e.target.value)} className="pokedex__grid-select">
                        <option value="ALL"> -- ALL -- </option>
                        {filterOptions.types
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((option, key) => (
                                <option key={key} value={option.name}>{option.name}</option>
                            )
                        )}
                    </select>
                </div>
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
        )
    }
}

export default connect((state, props) => {
    return {
        filterOptions: state.pokedexReducer.filterOptions,
        filters: state.pokedexReducer.filters,
    }
})(PokeFilters)