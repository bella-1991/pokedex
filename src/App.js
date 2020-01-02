import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store/configureStore'
import { connect } from 'react-redux'

import * as actions from './actions/actions'
import PokeHeader from './components/pokeHeader/pokeHeader'
import PokeGrid from './components/pokeGrid/pokeGrid'
import PokeDetails from './components/pokeDetails/pokeDetails'
import PokeOverlay from './components/pokeOverlay/pokeOverlay'
import './App.css'

class App extends Component {
  state = {
    allPokes: [],
    pokeTypes: [],
    selectedPoke: null,
    overlay: false,
    defaultSort: 'ASCE',
    defaultType: 'ALL'
  }

  componentWillMount() {
    this.props.dispatch(actions.fetchAllPokes())
    // this.fetchAllPokes()
    this.fetchPokeTypes()
  }

  // fetchAllPokes = _ => {
  //   fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  //    .then(rsp => rsp.json())
  //    .then(allPokes => {       
  //       this.setState({ allPokes: allPokes.results })
  //       this.handleSortChange(this.state.defaultSort)
  //    })
  // }

  fetchPokeTypes = _ => {
    fetch('https://pokeapi.co/api/v2/type')
     .then(rsp => rsp.json())
     .then(pokeTypes => {       
        this.setState({ pokeTypes: pokeTypes.results })
     })
  }

  fetchSelectedPoke = poke => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
        .then(rsp => rsp.json())
        .then(thisPoke => {            
            setTimeout(() => {
              this.setState({ selectedPoke : thisPoke, overlay: false })
            }, 500);
        })
}

  selectedPoke = poke => {
    this.setState({ overlay: true });
    this.fetchSelectedPoke(poke)
  }

  clearPoke = _ => {
    this.setState({ selectedPoke : null })
  }

  handleSortChange = sort => {
    const { allPokes } = this.state
    let sortedPokes;

    switch(sort){
      case 'ASCE':
        sortedPokes = allPokes.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'DESC': sortedPokes = allPokes.sort((a, b) => a.name.localeCompare(b.name)).reverse()
        break
      default:
        return
    }

    this.setState({ defaultSort: sort, allPokes: sortedPokes })
  }

  handleTypeChange = type => {
    const { allPokes } = this.state
    
    this.setState({ defaultType: type})
  }

  render () {    
    const { allPokes, selectedPoke, overlay, defaultSort, pokeTypes, defaultType } = this.state

    return (
      <Provider store={store}>
        <div className="pokedex">
          <PokeHeader selectedPoke={selectedPoke} clearPoke={this.clearPoke} />
          { 
              selectedPoke ? 
                <PokeDetails selectedPoke={selectedPoke} />      
              :
                <PokeGrid sprites={allPokes} 
                          selectedPoke={this.selectedPoke} 
                          defaultSort={defaultSort} 
                          handleSortChange={this.handleSortChange} 
                          filterTypes={pokeTypes}
                          defaultType={defaultType} 
                          handleTypeChange={this.handleTypeChange} />
          }
          { overlay && <PokeOverlay /> }
          
        </div>
      </Provider>      
    )
  }
}

export default connect((state, props) => {

})(App);
