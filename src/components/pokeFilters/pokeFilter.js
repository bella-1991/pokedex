import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions/actions'
import './poke-filter.css'

class PokeFilters extends Component {
    constructor(props) {
        super(props)

        this.handleTypeChange = this.handleTypeChange.bind(this)
        this.handleSortChange = this.handleSortChange.bind(this)
    }

    handleTypeChange = e => {
        this.props.handleTypeChange(e.target.value)
    }

    handleSortChange = e => {
        this.props.handleSortChange(e.target.value)
    }

    render () {
        const { defaultType, pokeTypes, defaultSort, sortOptions } = this.props

        return (
            <div className="pokedex__grid-filter">
                <div className="pokedex__grid-filter-container">
                    <label className="pokedex__grid-label">Filter By Type</label>
                    <select value={defaultType} onChange={this.handleTypeChange} className="pokedex__grid-select">
                        <option value="ALL"> --All-- </option>
                        {
                            pokeTypes.map((option, key) => 
                                <option key={key} value={option.name}>{option.name}</option>
                            )
                        }
                    </select>
                </div>
                <div className="pokedex__grid-filter-container">
                    <label className="pokedex__grid-label">Sort</label>
                    <select value={defaultSort} onChange={this.handleSortChange} className="pokedex__grid-select">
                        {
                            sortOptions.map((option, key) => 
                                <option key={key} value={option.code}>{option.value}</option>
                            )
                        }
                    </select>
                </div>
            </div>
        )
    }
}

// export default connect((state, props) => {
//     return {
//         defaultType: state.pokedexReducer.defaultType,
//         defaultSort: state.pokedexReducer.defaultSort,
//         pokeTypes: state.pokedexReducer.pokeTypes,
//         sortOptions: state.pokedexReducer.sortOptions
//     }
// })(PokeFilters)

export default PokeFilters