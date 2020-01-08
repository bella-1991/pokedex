import axios from 'axios'

import { URLS as urls, ActionTypes as types, Labels as errorLabels, DefaultFilters as dafaultValues } from '../constants'

/* 
 * get filters populated
 */
export function getFilterOptions() {
  return(dispatch, getState) => {    
    // get all Poke Generations
    getAllGenerations(dispatch)

    // get default generation info
    getAllGenerations(dispatch, getState().pokedexReducer.filters.defaultGeneration)

  }
}

/*
 * poke generation category changed
 */
export function handleGenChange(gen) {
  return (dispatch, getState) => { 
    // change gen filter
    dispatch({ type: types.CHANGE_GEN_TYPE, data: gen })
    
    // get selected generation info
    getAllGenerations(dispatch, getState().pokedexReducer.filters.defaultGeneration)
  }
}

/*
 * poke type category changed
 */
export function handleTypeChange(type) {
  return (dispatch, getState) => { 
    dispatch({ type: types.CHANGE_POKE_TYPE, data: type })
    getTypePokemon(dispatch, type)
    // fetchAllPokes(data, dispatch)
  }
}

/*
 * poke sort order changed
 */
export function handleSortChange(sort) {
  return (dispatch) => {
    dispatch({ type: types.REQUEST_SORT_TYPE_CHANGE, data: sort })
    // fetchAllPokes(data, dispatch)
  }
}

/*
 * poke results/page changed
 */
export function handleRPPChange(rpp) {
  return (dispatch) => {
    dispatch({ type: types.REQUEST_RPP_CHANGE, data: rpp })
    // fetchAllPokes(data, dispatch)
  }
}

/*
 * get all pokemon filterd and sorted 
 */
export function getAllPokes() {
  return (dispatch, getState) => {
    
    const stateData = getState().pokedexReducer,
          allPokes = stateData.allPokes,
          filters = stateData.filters, 
          typePokes = getTypePokemon(dispatch, filters.defaultType),
          sortedPokes = getFilteredResults(allPokes, filters, typePokes)
    
    console.log(sortedPokes)
    // fetchAllPokes1(params, dispatch)
  }
}

// // get all pokemon sorted and filtered
// export function getAllPokes(params) {
//   return (dispatch, getState) => {
//     fetchAllPokes(params, dispatch)
//   }
// }

// // poke type category changed
// export function handleTypeChange(data) {
//   return (dispatch, getState) => { 
//     dispatch({ type: types.CHANGE_POKE_TYPE, data: data.defaultType })
//     fetchAllPokes(data, dispatch)
//   }
// }

// // poke sort order changed
// export function handleSortChange(data) {
//   return (dispatch) => {
//     dispatch({ type: types.REQUEST_SORT_TYPE_CHANGE, data: data.defaultSort })
//     fetchAllPokes(data, dispatch)
//   }
// }

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

// load more poke
export function morePoke(data) {
  return (dispatch) => {
    // fetchMorePokeAjaxCall(defaultType, defaultSort, pages, dispatch)
    dispatch({ type:types.REQUEST_SORT_TYPE_CHANGE, data: data.pages  })
    // fetchAllPokes(data, dispatch)
  }
}


// function getTypeAndSortedPokes(options, allPokes, AllTypePokes) {
//   let typePokes, sortedPokes

//   // filter according to type
//   if (options.defaultType === 'ALL') {
//     typePokes = allPokes
//   } else { 
//     typePokes =  allPokes.filter(allPoke => {
//       return AllTypePokes.find(typePoke => {
//         if (allPoke.name === typePoke.pokemon.name)
//         {
//           return allPoke
//         }
//       })
//     })
//   }

//   // sorted according to order
//   switch(options.defaultSort) {
//     case 'ASCE':
//         sortedPokes = typePokes.sort((a, b) => a.name.localeCompare(b.name))
//         break;
//     case 'DESC':
//         sortedPokes = typePokes.sort((a, b) => a.name.localeCompare(b.name)).reverse()
//         break;
//     default:
//         return
//   }

//   return sortedPokes
// }

function getFilteredResults(allPokes, filters, allTypePokes) {
  let typePokes, sortedPokes

  // filter according to type
  if (filters.defaultType === 'ALL') {
    typePokes = allPokes
  } else { 
    typePokes =  allPokes.filter(allPoke => {
      return allTypePokes.find(typePoke => {
        if (allPoke.name === typePoke.pokemon.name)
        {
          return allPoke
        }
      })
    })
  }

  // sorted according to order
  switch(filters.defaultSort) {
    case 'ASCE':
        sortedPokes = typePokes.sort((a, b) => a.name.localeCompare(b.name))
        break;
    case 'DESC':
        sortedPokes = typePokes.sort((a, b) => a.name.localeCompare(b.name)).reverse()
        break;
    default:
        return
  }

  return sortedPokes
}

// function fetchAllPokesAjaxCall (defaultType, defaultSort, dispatch) {
//   dispatch({ type:types.REQUEST_ALL_POKES })

//   // get all pokes
//   axios.get('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0')
//   .then((resp) => {
//     const respResults = resp.data.results
//     let typePokes

//     if (defaultType === 'ALL') {
//       typePokes = respResults

//       const sortedPokes = getTypeAndSortedPokes(defaultSort, typePokes, typePokes)
//       dispatch({ type:types.RECEIVED_ALL_POKES_SUCCESS, data: sortedPokes })
//     } else { 

//       axios.get(`https://pokeapi.co/api/v2/type/${defaultType}`)
//       .then((res) => {
//         typePokes = res.data.pokemon
        
//         const sortedPokes = getTypeAndSortedPokes(defaultSort, respResults, typePokes)
//         console.log(sortedPokes.length)
        
//         sortedPokes.length ? dispatch({ type:types.RECEIVED_SORTED_POKES_SUCCESS, data: sortedPokes }) : dispatch({ type:types.NO_SORTED_POKES_FOUD, data: {msg: 'No Pokes found. Please try again'} })
//       })
//       .catch((resp) => {
//         dispatch({ type: types.RECEIVED_SORTED_POKES_FAILURE, data: {msg: types.COULD_NOT_GET_POKES, failedCall: 'fetch sorted pokes'} })
//       })
//     }
//   })
//   .catch((resp) => {
//     dispatch({ type: types.RECEIVED_ALL_POKES_FAILURE, data: {msg: types.COULD_NOT_GET_POKES, failedCall: 'fetch pokes'} })
//   })
// }

// function fetchPokeTypesAjaxCall (dispatch) {
//   dispatch({type:types.REQUEST_POKE_TYPES})

//   axios.get('https://pokeapi.co/api/v2/type')
//   .then((resp) => {
//     dispatch({ type: types.RECEIVED_POKE_TYPES_SUCCESS, data: resp.data.results })
//   })
//   .catch((resp) => {
//     const msg = types.COULD_NOT_GET_POKE_TYPES
//     dispatch({ type: types.RECEIVED_POKE_TYPES_FAILURE, data: {msg: msg, failedCall: 'fetch poke types'} })
//   })
// }

function fetchSelectedPokeAjaxCall (poke, dispatch) {
  dispatch({ type: types.REQUEST_SELECTED_POKE })

  axios.get(urls.ALL_POKEMON + `/${poke}`).then((resp) => {
    dispatch({ type: types.RECEIVED_SELECTED_POKE_SUCCESS, data: resp.data })
  }).catch((resp) => {
    dispatch({ type: types.RECEIVED_SELECTED_POKE_FAILURE, data: {msg: errorLabels.COULD_NOT_GET_SELECTED_POKE} })
  })
}

// function fetchMorePokeAjaxCall (defaultType, defaultSort, pages, dispatch) {
//   const newPage = pages + 1
//   dispatch({ type:types.REQUEST_MORE_POKES, data: newPage  })

//   // get all pokes
//   axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${newPage*10}`)
//   .then((resp) => {
//     const respResults = resp.data.results
//     let typePokes

//     if (defaultType === 'ALL') {
//       typePokes = respResults

//       const sortedPokes = getTypeAndSortedPokes(defaultSort, typePokes, typePokes)
//       dispatch({ type:types.RECEIVED_MORE_POKES_SUCCESS, data: sortedPokes })
//     } else { 

//       axios.get(`https://pokeapi.co/api/v2/type/${defaultType}`)
//       .then((res) => {
//         typePokes = res.data.pokemon

//         const sortedPokes = getTypeAndSortedPokes(defaultSort, respResults, typePokes)
//         dispatch({ type:types.RECEIVED_MORE_SORTED_POKES_SUCCESS, data: sortedPokes })
//       })
//       .catch((resp) => {
//         const msg = types.COULD_NOT_GET_POKES
//         dispatch({ type: types.RECEIVED_MORE_SORTED_POKES_FAILURE, data: {msg: msg, failedCall: 'fetch sorted pokes'} })
//       })
//     }
//   })
//   .catch((resp) => {
//     const msg = types.COULD_NOT_GET_POKES
//     dispatch({ type: types.RECEIVED_MORE_POKES_FAILURE, data: {msg: msg, failedCall: 'fetch pokes'} })
//   })
// }

// function fetchAllPokes (options, dispatch) {
//   console.log(options)
//   dispatch({ type:types.REQUEST_ALL_POKES })

//   // call for all pokes
//   fetchAllPokesAjaxCall(options.pages).then(allPokesData => {
//     dispatch({type:types.REQUEST_POKE_TYPES})
    
//     // call for all poke types
//     fetchPokeTypesAjaxCall(options.defaultType).then(allPokeTypesData => {  

//       const allTypes = allPokeTypesData.data.results ? allPokeTypesData.data.results : allPokeTypesData.data.pokemon,
//             sortedPokes = getTypeAndSortedPokes(options, allPokesData.data.results, allTypes)

//       dispatch({ type: types.RECEIVED_POKE_TYPES_SUCCESS, data: allTypes })
//       dispatch({ type:types.RECEIVED_ALL_POKES_SUCCESS, data: sortedPokes })
//     })
//     .catch(allPokeTypesError => {
//       dispatch({ type: types.RECEIVED_POKE_TYPES_FAILURE, data: {msg: errorLabels.COULD_NOT_GET_POKE_TYPES} })
//     })
//   }).catch(allPokesError => {
//     dispatch({ type: types.RECEIVED_ALL_POKES_FAILURE, data: {msg: errorLabels.COULD_NOT_GET_POKES } })
//   })
// }

/*
 * get Poke Generations & information
 */
function getAllGenerations(dispatch, generation) {
  dispatch({ type: types.REQUEST_POKE_GENERATIONS })

  fetchPokeGenerations(generation).then(data => {
    generation ? (dispatch({ type: types.RECEIVED_EACH_POKE_GENERATION_SUCCESS, data: {pokemon: data.data.pokemon_species, types: data.data.types} })
    ):( dispatch({ type: types.RECEIVED_POKE_GENERATIONS_SUCCESS, data: data.data.results }) )
  }).catch(err => {
    generation ? ( dispatch({ type: types.RECEIVED_EACH_POKE_GENERATION_FAILURE, data: {msg: errorLabels.COULD_NOT_GET_EACH_POKE_GENERATION} }) 
    ):( dispatch({ type: types.RECEIVED_POKE_GENERATIONS_FAILURE, data: {msg: errorLabels.COULD_NOT_GET_POKE_GENERATIONS} }) )
  })
}

/* 
 * get all pokes of selected type
 */
function getTypePokemon(dispatch, type) {
  dispatch({type:types.REQUEST_POKE_TYPES})

  fetchPokeTypesAjaxCall(type).then(data => {  
    const allPokeOfTypes = data.data.pokemon ? data.data.pokemon : null

    
    console.log(allPokeOfTypes)

    // const allTypes = data.data.results ? data.data.results : data.data.pokemon,
    //       sortedPokes = getTypeAndSortedPokes(options, allPokesData.data.results, allTypes)

    // dispatch({ type: types.RECEIVED_POKE_TYPES_SUCCESS, data: data })
    // dispatch({ type:types.RECEIVED_ALL_POKES_SUCCESS, data: sortedPokes })
  })
  .catch(allPokeTypesError => {
    dispatch({ type: types.RECEIVED_POKE_TYPES_FAILURE, data: {msg: errorLabels.COULD_NOT_GET_POKE_TYPES} })
  })
}

function fetchPokeGenerations(generation) {
  // get all poke generations
  return axios.get(urls.POKE_GENERATIONS + (generation ? generation : '')).then(resp => {
    return resp
  }).catch(err => {
    return err
  })
}

function fetchAllPokesAjaxCall(pages) {
  // get all pokes
  return axios.get(`${urls.ALL_POKEMON}?limit=${urls.POKE_LIMIT}`).then(resp => {
    return resp
  }).catch(err => {
    return err
  })
}

function fetchPokeTypesAjaxCall(type) {
  // if type
  // get all poke types
  return axios.get(urls.POKE_TYPES + (type !== dafaultValues.TYPE ? type : '')).then(resp => {
    return resp
  }).catch(err => {
    return err      
  })
}