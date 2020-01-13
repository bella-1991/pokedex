import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions/actions'
import PokeGrid from '../pokeGrid/pokeGrid'
import './more-pokes.css'

class MorePokes extends Component {
    morePoke = _ => {
        const { filters } = this.props
        
        filters.defaultRPP = filters.defaultRPP + 10
    }

    getPages = (pages, currentPage) => {
        const firstPage = 1,
                previous = currentPage - firstPage;
        let pagesList = [],
            nextPageToPrint

        // Print first Page
        if (firstPage === currentPage) {
            //list.push();
            pagesList.push(currentPage)
        } else {
            pagesList.push(currentPage)
        }

        // If there are 4 or less previous pages, print them all
        if (previous <= 4) { 
            for (let i = firstPage + 1; i <= previous; i++) {
                pagesList.push(i)
            }
        } else {
            nextPageToPrint = currentPage - 2;
            pagesList.push('...')

            for (var i = nextPageToPrint; i < currentPage; i++) {
                pagesList.push(i)
            }
        }

        // Print current Page if not equal to first page
        if (currentPage !== firstPage) {
            pagesList.push(currentPage)
        }

        // Print last Page
        if (pages !== currentPage) {
            pagesList.push(pages)
        }

        // for (let i = 0; i < pages; i++) {
        //     pagesList.push(<button key={i} className="pokedex__more-button" onClick={this.morePoke}>{i}</button>)
        // }

        console.log(pagesList)

        return pagesList
    }
    
    render () {
        const { currentResults, numberOfResults, page, pages } = this.props

        return (
            <div className="pokedex__more-pokes">    
                <button className="pokedex__more-button" onClick={this.morePoke} disabled={page === 1 ? true : false} >First</button>
                {/* { pages.map(pageNum => (
                    <button className="pokedex__more-button" onClick={this.morePoke}>{pageNum}</button>    
                ))} */}
                { this.getPages(pages, page) }
                <button className="pokedex__more-button" onClick={this.morePoke} disabled={page === pages? true : false}>Last</button>
                    
            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        filters: state.pokedexReducer.filters,
        currentResults: state.pokedexReducer.results.filteredResults,
        numberOfResults: state.pokedexReducer.results.numberOfResults,
        page: state.pokedexReducer.results.page,
        pages: state.pokedexReducer.results.pages
    }
})(MorePokes)