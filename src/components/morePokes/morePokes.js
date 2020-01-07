import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions/actions'
import PokeGrid from '../pokeGrid/pokeGrid'
import './more-pokes.css'

class MorePokes extends Component {
    state = {
        array: [1,2,3,4]
    }

    morePoke = _ => {
        const { defaultType, defaultSort, pages } = this.props,
            data = {
                defaultType: defaultType,
                defaultSort: defaultSort,
                pages: pages + 1
            }

        this.props.dispatch(actions.morePoke(data))
    }
    
    render () {
        const { MorePokes } = this.props

        // console.log(MorePokes)

        return (
            <div className="pokedex__more-pokes">                
                {
                    MorePokes && MorePokes.map((eachList, index) => {
                        return <PokeGrid key={index} sprites={eachList} />
                    })
                }
                <button className="pokedex__more-button" onClick={this.morePoke}>Load next set of Pokes</button>
            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        MorePokes: state.pokedexReducer.morePokes,
        defaultType: state.pokedexReducer.defaultType,
        defaultSort: state.pokedexReducer.defaultSort,
        pages: state.pokedexReducer.pages
    }
})(MorePokes)