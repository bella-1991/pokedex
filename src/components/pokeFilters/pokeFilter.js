import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions/actions'
import './poke-filter.css'

class PokeFilters extends Component {
    handleTypeChange = type => {
        const { defaultSort, pages } = this.props,
            data = {
                defaultType: type,
                defaultSort: defaultSort,
                pages: pages
            }

        this.props.dispatch(actions.handleTypeChange(data))
    }

    handleSortChange = type => { 
        const { defaultType, pages } = this.props,
            data = {
                defaultType: defaultType,
                defaultSort: type,
                pages: pages
            }
        this.props.dispatch(actions.handleSortChange(data))
    }

    render () {
        const { defaultType, pokeTypes, defaultSort, sortOptions } = this.props

        return (
            <div className="pokedex__grid-filter">
                <div className="pokedex__grid-filter-container">
                    <label className="pokedex__grid-label">Filter By Type</label>
                    <select value={defaultType} onChange={e => this.handleTypeChange(e.target.value)} className="pokedex__grid-select">
                        <option value="ALL"> --All-- </option>
                        {pokeTypes.map((option, key) => (
                                <option key={key} value={option.name}>{option.name}</option>
                        ))}
                    </select>
                </div>
                <div className="pokedex__grid-filter-container">
                    <label className="pokedex__grid-label">Sort</label>
                    <select value={defaultSort} onChange={e => this.handleSortChange(e.target.value)} className="pokedex__grid-select">
                        {sortOptions.map((option, key) => (
                            <option key={key} value={option.code}>{option.value}</option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        defaultType: state.pokedexReducer.defaultType,
        defaultSort: state.pokedexReducer.defaultSort,
        pokeTypes: state.pokedexReducer.pokeTypes,
        sortOptions: state.pokedexReducer.sortOptions,
        pages: state.pokedexReducer.pages
    }
})(PokeFilters)