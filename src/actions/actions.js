import axios from 'axios'

import { ActionTypes as types } from '../constants'

export function fetchAllPokes(defaultSort) {
  return (dispatch) => {
      fetchAllPokesAjaxCall(defaultSort, dispatch)
  }
}

export function fetchPokeTypes() {
  return (dispatch) => {
    fetchPokeTypesAjaxCall(dispatch)
  }
}

export function handleTypeChange(type) {
  return {
    type: types.CHANGE_POKE_TYPE,
    data: { type: type }
  }
}

export function handleSortChange(type, allPokes) {
  // return {
  //   type: types.CHANGE_SORT_TYPE,
  //   data: { type: type }
  // }

  // const sortedPokes = getSortPokes(allPokes, type)

  // dispatch({ type:types.RECEIVED_ALL_POKES_SUCCESS, data: sortedPokes })

  return (dispatch) => {
    const sortedPokes = getSortPokes(allPokes, type)

    const data = {
      
    }

    dispatch({ type:types.CHANGE_SORT_TYPE, data: type })
    dispatch({ type:types.RECEIVED_ALL_POKES_SUCCESS, data: sortedPokes })
  }
}

export function selectedPoke(poke) {
  return (dispatch) => {
    fetchSelectedPokeAjaxCall(poke, dispatch)
  }
}

export function clearPoke() {
  return {
    type: types.CLEAR_POKE
  }
}

function fetchAllPokesAjaxCall (defaultSort, dispatch) {
  dispatch({type:types.REQUEST_ALL_POKES})

  axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
  .then((resp) => {
    const sortedPokes = getSortPokes(resp.data.results, defaultSort)

    dispatch({ type:types.RECEIVED_ALL_POKES_SUCCESS, data: sortedPokes })
  })
  .catch((resp) => {
    const msg = types.COULD_NOT_GET_POKES
    dispatch({ type: types.RECEIVED_ALL_POKES_FAILURE, data: {msg: msg, failedCall: 'fetch pokes'} })
  })
}

function fetchPokeTypesAjaxCall (dispatch) {
  dispatch({type:types.REQUEST_POKE_TYPES})

  axios.get('https://pokeapi.co/api/v2/type')
  .then((resp) => {
    dispatch({ type: types.RECEIVED_POKE_TYPES_SUCCESS, data: resp.data.results })
  })
  .catch((resp) => {
    const msg = types.COULD_NOT_GET_POKE_TYPES
    dispatch({ type: types.RECEIVED_POKE_TYPES_FAILURE, data: {msg: msg, failedCall: 'fetch poke types'} })
  })
}

function fetchSelectedPokeAjaxCall (poke, dispatch) {
  dispatch({ type: types.REQUEST_SELECTED_POKE })

  axios.get(`https://pokeapi.co/api/v2/pokemon/${poke}`)
  .then((resp) => {
    dispatch({ type: types.RECEIVED_SELECTED_POKE_SUCCESS, data: resp.data })
  })
  .catch((resp) => {
    const msg = types.COULD_NOT_GET_SELECTED_POKE
    dispatch({ type: types.RECEIVED_SELECTED_POKE_FAILURE, data: {msg: msg, failedCall: 'fetch poke types'} })
  })
}

function getSortPokes(allPokes, sortOrder) {
  let sortedPokes

  
  console.log(allPokes)

  switch(sortOrder) {
    case 'ASCE':
        sortedPokes = allPokes.sort((a, b) => a.name.localeCompare(b.name))
        break;
    case 'DESC':
        sortedPokes = allPokes.sort((a, b) => a.name.localeCompare(b.name)).reverse()
        break;
    default:
        return
  }

  console.log(sortedPokes)

  return sortedPokes  
}

// function fetchSortedPokesAjaxCall (allPokes, sortOrder, dispatch) {
//   let sortedPokes
  
//   dispatch({ type: types.REQUEST_SORT_POKES })
//   console.log(allPokes)
//   console.log(sortOrder)

//   switch(sortOrder) {
//     case 'ASCE':
//         sortedPokes = allPokes.sort((a, b) => a.name.localeCompare(b.name))

//         console.log(sortedPokes)
//         break;
//     case 'DESC':
//         sortedPokes = allPokes.sort((a, b) => a.name.localeCompare(b.name)).reverse()
//         break;
//     default:
//         return
//   }

//   console.log(sortedPokes)

//   dispatch({ type: types.RECEIVED_SORTED_POKES, data: sortedPokes })

// }