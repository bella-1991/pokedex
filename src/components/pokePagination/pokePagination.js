import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions/actions'
import PokeGrid from '../pokeGrid/pokeGrid'
import './poke-pagination.css'

class PokePagination extends Component {
    handlePageChange = page => {
        const { filters } = this.props
        
        filters.defaultPage = parseInt(page.target.getAttribute('data-value'))
        this.props.dispatch(actions.handlePageChange(filters))
    }

    getPages = (pages, currentPage) => {
        const firstPage = 1,
                lastPage = pages,
                previous = currentPage - firstPage,
                next = lastPage - currentPage

        let pagesList = [],
            nextPageToPrint,
            pageToStopPrinting

        // Print first Page
        if (firstPage === currentPage) {
            pagesList.push(<span className="pokedex__pagination-span pokedex__pagination-span--active">{currentPage}</span>)
        } else {
            pagesList.push(<button className="pokedex__pagination-button" data-value={firstPage} onClick={e => this.handlePageChange(e)}>{firstPage}</button>)
        }
        
        // print prev pages
        if (previous <= 4) { 
            for (let i = firstPage+1; i <= previous; i++) {
                pagesList.push(<button key={i} className="pokedex__pagination-button" data-value={i} onClick={e => this.handlePageChange(e)}>{i}</button>)
            }
        } else {
            nextPageToPrint = currentPage - 2;
            pagesList.push(<span className="pokedex__pagination-span">...</span>)

            for (var i = nextPageToPrint; i < currentPage; i++) {
                pagesList.push(<button key={i} className="pokedex__pagination-button" data-value={i} onClick={e => this.handlePageChange(e)}>{i}</button>)
            }
        }

        // Print current Page if not equal to first page
        if (currentPage !== firstPage) {
            pagesList.push(<span className="pokedex__pagination-span pokedex__pagination-span--active">{currentPage}</span>)
        }

        // print next pages
        if (next <= 4) { 
            for (var i = currentPage + 1; i < lastPage; i++) {
                pagesList.push(<button key={i} className="pokedex__pagination-button" data-value={i} onClick={e => this.handlePageChange(e)}>{i}</button>)
            }

        } else if (next > 4) { // If there are more than 4 next pages, print the most recent two and dots
            pageToStopPrinting = currentPage + 2;

            for (var i = currentPage + 1; i <= pageToStopPrinting; i++) {
                pagesList.push(<button key={i} className="pokedex__pagination-button" data-value={i} onClick={e => this.handlePageChange(e)}>{i}</button>)
            }

            pagesList.push(<span className="pokedex__pagination-span pokedex__pagination-span--more">...</span>)
        }

        // Print last Page
        if (pages !== currentPage) {
            pagesList.push(<button className="pokedex__pagination-button" data-value={pages} onClick={e => this.handlePageChange(e)}>{pages}</button>)
        }

        return pagesList
    }
    
    render () {
        const { currentResults, numberOfResults, page, pages } = this.props

        return (
            <div className="pokedex__pagination">    
                <button className="pokedex__pagination-button pokedex__pagination-button--prev" data-value={1} onClick={e => this.handlePageChange(e)} disabled={page === 1 ? true : false} >First</button>
                { this.getPages(pages, page) }
                <button className="pokedex__pagination-button pokedex__pagination-button--next" data-value={pages} onClick={e => this.handlePageChange(e)} disabled={page === pages? true : false}>Last</button>
                    
            </div>
        )
    }
}

export default connect((state, props) => {
    return {
        filters: state.pokedexReducer.filters,
        page: state.pokedexReducer.results.page,
        pages: state.pokedexReducer.results.pages
    }
})(PokePagination)