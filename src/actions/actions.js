import axios from 'axios'

import { URLS as urls, ActionTypes as types, Labels as errorLabels, DefaultFilters as defaultValues } from '../constants'

/* 
 * get filters populated
 */
export function initialisePokedex() {
  return(dispatch, getState) => {    
    // get all Poke Generations
    getAllGenerations(dispatch)

    // get default generation info
    getAllGenerations(dispatch, getState().pokedexReducer.filters)
  }
}

/*
 * poke generation category changed
 */
export function handleGenChange(filters) {
  return (dispatch, getState) => { 
    // change gen filter
    dispatch({ type: types.CHANGE_GEN_TYPE, data: filters.defaultGeneration })
    
    filters.defaultType = []
    
    // get selected generation info
    getAllGenerations(dispatch, filters)
  }
}

export function addTypeList(gen) {
  return {
    type: types.ADD_TYPE_LIST,
    data: gen
  }
}

export function removeTypeList(gen) {
  return {
    type: types.REMOVE_TYPE_LIST,
    data: gen
  }
}

export function handleTypeChange(filters) {
  return (dispatch, getState) => { 

    // change type filter
    dispatch({ type: types.CHANGE_POKE_TYPE, data: filters.defaultType })

    // get selected type info
    getTypePokemon(dispatch, getState, filters)
  }
}

/*
 * poke sort order changed
 */
export function handleSortChange(filters) {
  return (dispatch, getState) => {
    // change sort category
    dispatch({ type: types.REQUEST_SORT_TYPE_CHANGE, data: filters.defaultSort })
    
    // get selected sort info
    getTypePokemon(dispatch, getState, filters)
  }
}

/*
 * poke results/page changed
 */
export function handleRPPChange(filters) {
  return (dispatch, getState) => {
    // change results per page
    dispatch({ type: types.REQUEST_RPP_CHANGE, data: filters.defaultRPP })

    // get selected results per page
    getTypePokemon(dispatch, getState, filters)
  }
}

/*
* poke results/page changed
*/
export function handlePageChange(filters) {
 return (dispatch, getState) => {
   // change results per page
   dispatch({ type: types.REQUEST_PAGE_CHANGE, data: filters.defaultPage })

   // get selected results per page
   getTypePokemon(dispatch, getState, filters)
 }
}

// get selected pokemon
export function selectedPoke(poke) {
  return (dispatch) => {
    fetchSelectedPokeAjaxCall(poke, dispatch)
  }
}

// clear selected pokemon
export function clearPoke() {
  return {
    type: types.CLEAR_POKE
  }
}

function getFilteredResults(filters, allPokes, allTypePokes) {
  let typePokes, sortedPokes, filteredResults, results, pages 

  if (!filters.defaultType.length){
    typePokes = allPokes
  } else {
    typePokes =  allPokes.filter(eachPoke => {
      return allTypePokes.find(typePoke => {
        if (eachPoke.name === typePoke.name)
          return eachPoke
      })
    })
  }

  // sorted according to order
  switch(filters.defaultSort) {
    case 'REL':
        sortedPokes = typePokes
        break;
    case 'ASCE':
        sortedPokes = typePokes.sort((a, b) => a.name.localeCompare(b.name))
        break;
    case 'DESC':
        sortedPokes = typePokes.sort((a, b) => a.name.localeCompare(b.name)).reverse()
        break;
    default:
        return 
  }

  if (filters.defaultRPP === defaultValues.ALL) {
    filteredResults = sortedPokes
    pages = 1
  } else {
    filteredResults = filterByResultPerPage(sortedPokes, filters.defaultPage, filters.defaultRPP)
    pages = ((sortedPokes.length + parseInt(filters.defaultRPP) - 1) / parseInt(filters.defaultRPP))
  }

  results = {
    allPokes: allPokes,
    numberOfResults: sortedPokes.length,
    filteredResults: filteredResults,
    pages: Math.floor(pages),
    page: filters.defaultPage
  }

  return results
}

function filterByResultPerPage(sortedPokes, currentPage, rpp) {
  const indexOfLast = currentPage * rpp,
        indexOfFirst = indexOfLast - rpp,
        currentList = sortedPokes.slice(indexOfFirst, indexOfLast)

  return currentList
  // return sortedPokes.slice(0, rpp);
}

/*
 * get selected poke details
 */
function fetchSelectedPokeAjaxCall (poke, dispatch) {
  dispatch({ type: types.REQUEST_SELECTED_POKE })

  axios.get(urls.ALL_POKEMON + `/${poke}`).then((resp) => {
    dispatch({ type: types.RECEIVED_SELECTED_POKE_SUCCESS, data: resp.data })
  }).catch((resp) => {
    dispatch({ type: types.RECEIVED_SELECTED_POKE_FAILURE, data: {msg: errorLabels.COULD_NOT_GET_SELECTED_POKE} })
  })
}

/*
 * get Poke Generations & information
 */
function getAllGenerations(dispatch, filters) {
  dispatch({ type: types.REQUEST_POKE_GENERATIONS })

  if (typeof filters !== 'undefined') {
    fetchPokeGenerations(filters.defaultGeneration).then(data => {
        const allPokemon = data.data.pokemon_species,
              allPokemonTypes = data.data.types,
              sortedPokes = getFilteredResults(filters, allPokemon, allPokemonTypes);
  
        dispatch({ type: types.RECEIVED_EACH_POKE_GENERATION_SUCCESS, data: {pokemon: allPokemon, types: allPokemonTypes} })
        dispatch({ type:types.RECEIVED_SORTED_POKES_SUCCESS, data: sortedPokes })
    }).catch(err => {
      dispatch({ type: types.RECEIVED_EACH_POKE_GENERATION_FAILURE, data: {msg: errorLabels.COULD_NOT_GET_EACH_POKE_GENERATION} }) 
    })
  } else {
    fetchPokeGenerations().then(data => {      
        dispatch({ type: types.RECEIVED_POKE_GENERATIONS_SUCCESS, data: data.data.results }) 
    }).catch(err => {
       dispatch({ type: types.RECEIVED_POKE_GENERATIONS_FAILURE, data: {msg: errorLabels.COULD_NOT_GET_POKE_GENERATIONS} }) 
    })
  }
}

/* 
 * get all pokes of selected type
 */
function getTypePokemon(dispatch, getState, filters) {
  dispatch({type:types.REQUEST_POKE_TYPES})

  if (filters.defaultType.length) {
    filters.defaultType.map(eachType => {
  
      fetchPokeTypesAjaxCall(eachType).then(data => {  
        data.data.pokemon.map(each => {
          if (getState().pokedexReducer.pokeOfTypes.indexOf(each.pokemon.name) === -1) {
            dispatch({ type:types.RECEIVED_POKE_TYPES_SUCCESS, data: each.pokemon })
          } 
        })
      })
      .catch(err => {
        dispatch({ type: types.RECEIVED_POKE_TYPES_FAILURE, data: {msg: errorLabels.COULD_NOT_GET_POKE_TYPES} })
      })

    })
  }

  setTimeout(() => {
    const sortedOnes = getFilteredResults(filters, getState().pokedexReducer.allPokes, getState().pokedexReducer.pokeOfTypes)
    dispatch({ type:types.RECEIVED_SORTED_POKES_SUCCESS, data: sortedOnes })
  }, 2000)
}

function fetchPokeGenerations(generation) {
  // get all poke generations
  return axios.get(urls.POKE_GENERATIONS + (typeof generation !== 'undefined' ? generation : '')).then(resp => {
    return resp
  }).catch(err => {
    return err
  })
}

function fetchPokeTypesAjaxCall(type) {
  // get all poke types
  return axios.get(urls.POKE_TYPES + (type !== defaultValues.TYPE ? type : '')).then(resp => {
    return resp
  }).catch(err => {
    return err      
  })
}