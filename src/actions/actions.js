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
    
    // get selected generation info
    getAllGenerations(dispatch, filters)
  }
}

/*
 * poke type category changed
 */
export function handleTypeChange(filters) {
  return (dispatch, getState) => { 
    // change type filter
    dispatch({ type: types.CHANGE_POKE_TYPE, data: {type: filters.defaultType, rpp: filters.defaultRPP} })

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

// load more poke
export function morePoke(filters) {
  return (dispatch, getState) => {
    // fetchMorePokeAjaxCall(defaultType, defaultSort, pages, dispatch)
    dispatch({ type:types.REQUEST_RPP_CHANGE, data: filters.defaultRPP  })
    
    // get more results
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
  let typePokes, sortedPokes, filteredResults, results

  // filter according to type
  if (filters.defaultType === defaultValues.TYPE) {
    typePokes = allPokes
  } else { 
    typePokes =  allPokes.filter(eachPoke => {
      return allTypePokes.find(typePoke => {
        if (eachPoke.name === typePoke.pokemon.name)
          return eachPoke
      })
    })
  }

  // sorted according to order
  switch(filters.defaultSort) {
    case 'REL':
        sortedPokes = typePokes.reverse()
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

  filteredResults = filterByResultPerPage(sortedPokes, filters.defaultRPP);

  results = {
    allPokes: allPokes,
    numberOfResults: sortedPokes.length,
    filteredResults: filteredResults,
    pages: ((allPokes.length) / filters.defaultRPP).toFixed(),
    page: filters.defaultPage
  }

  return results
}

function filterByResultPerPage(sortedPokes, rpp) {
  return sortedPokes.slice(0, rpp);
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

  fetchPokeTypesAjaxCall(filters.defaultType).then(data => {  
    const allTypes = data.data.results ? data.data.results : data.data.pokemon,
          sortedPokes = getFilteredResults(filters, getState().pokedexReducer.results.allPokes, allTypes)
    
    dispatch({ type:types.RECEIVED_SORTED_POKES_SUCCESS, data: sortedPokes })
  })
  .catch(err => {
    dispatch({ type: types.RECEIVED_POKE_TYPES_FAILURE, data: {msg: errorLabels.COULD_NOT_GET_POKE_TYPES} })
  })
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