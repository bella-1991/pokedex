import axios from 'axios'

import { URLS as urls, ActionTypes as types, Labels as errorLabels } from '../constants'

// get all pokemon sorted and filtered
export function getAllPokes(params) {
  return (dispatch) => fetchAllPokes(params, dispatch)
}

// poke type category changed
export function handleTypeChange(data) {
  return (dispatch) => { 
    dispatch({ type: types.CHANGE_POKE_TYPE, data: data.defaultType })
    fetchAllPokes(data, dispatch)
  }
}

// poke sort order changed
export function handleSortChange(data) {
  return (dispatch) => {
    dispatch({ type: types.REQUEST_SORT_TYPE_CHANGE, data: data.defaultSort })
    fetchAllPokes(data, dispatch)
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

// load more poke
export function morePoke(data) {
  return (dispatch) => {
    // fetchMorePokeAjaxCall(defaultType, defaultSort, pages, dispatch)
    dispatch({ type:types.REQUEST_SORT_TYPE_CHANGE, data: data.pages  })
    fetchAllPokes(data, dispatch)
  }
}

// function getTypeAndSortedPokes (defaultSort, allPokes, AllTypePokes) {
//   let typePokes, sortedPokes

//   // filter according to type
//   if (allPokes === AllTypePokes) {
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
//   switch(defaultSort) {
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

function getTypeAndSortedPokes(options, allPokes, AllTypePokes) {
  let typePokes, sortedPokes

  // filter according to type
  if (options.defaultType === 'ALL') {
    typePokes = allPokes
  } else { 
    typePokes =  allPokes.filter(allPoke => {
      return AllTypePokes.find(typePoke => {
        if (allPoke.name === typePoke.pokemon.name)
        {
          return allPoke
        }
      })
    })
  }

  // sorted according to order
  switch(options.defaultSort) {
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

function fetchAllPokes (options, dispatch) {
  console.log(options)
  dispatch({ type:types.REQUEST_ALL_POKES })

  // call for all pokes
  fetchAllPokesAjaxCall(options.pages).then(allPokesData => {
    dispatch({type:types.REQUEST_POKE_TYPES})
    
    // call for all poke types
    fetchPokeTypesAjaxCall(options.defaultType).then(allPokeTypesData => {  

      const allTypes = allPokeTypesData.data.results ? allPokeTypesData.data.results : allPokeTypesData.data.pokemon,
            sortedPokes = getTypeAndSortedPokes(options, allPokesData.data.results, allTypes)

      dispatch({ type: types.RECEIVED_POKE_TYPES_SUCCESS, data: allTypes })
      dispatch({ type:types.RECEIVED_ALL_POKES_SUCCESS, data: sortedPokes })
    })
    .catch(allPokeTypesError => {
      dispatch({ type: types.RECEIVED_POKE_TYPES_FAILURE, data: {msg: errorLabels.COULD_NOT_GET_POKE_TYPES} })
    })
  }).catch(allPokesError => {
    dispatch({ type: types.RECEIVED_ALL_POKES_FAILURE, data: {msg: errorLabels.COULD_NOT_GET_POKES } })
  })
}

function fetchAllPokesAjaxCall(pages) {
  // get all pokes
  return axios.get(`${urls.ALL_POKEMON}?limit=${urls.POKE_LIMIT*pages}`).then(resp => {
    return resp
  }).catch(err => {
    return err
  })
}

function fetchPokeTypesAjaxCall(type) {
  // if type
  // get all poke types
  return axios.get(urls.POKE_TYPES + (type !== 'ALL' ? type : '')).then(resp => {
    return resp
  }).catch(err => {
    return err      
  })
}