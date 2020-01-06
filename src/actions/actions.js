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

export function handleTypeChange(type, allPokes, defaultSort) {
  return (dispatch) => {
    if (type === 'ALL') {
      fetchAllPokesAjaxCall(defaultSort, dispatch)
    } else { 
      fetchTypePokesAjaxCall(type, allPokes, dispatch)
    }
  }
}

export function handleSortChange(type, allPokes) {

  return (dispatch) => {    
    const sortedPokes = getSortPokes(allPokes, type)

    dispatch({ type:types.REQUEST_SORT_TYPE_CHANGE, data: type })
    dispatch({ type:types.RECEIVED_SORTED_POKES_SUCCESS, data: sortedPokes })
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



function getSortPokes(allPokes, sortOrder) {
  let sortedPokes

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

  return sortedPokes  
}

function getTypePokes(allPokes, typePokes) {

  // const newPokes = allPokes.filter(poke => {
  //   // console.log(poke.name)
  //   // console.log(typePokes.find(x => x.pokemon.name === poke.name ))
  //   const names = typePokes.map(typePoke => {
  //     // console.log(typePoke.pokemon.name === poke.name)
  //     return typePoke.pokemon.name === poke.name 
  //   })
    
  //   console.log(names)
  // })

  var newPokes = allPokes.reduce(function(filtered, typePokes) {
    console.log(filtered)
    console.log(typePokes)
    // if (option.assigned) {
    //    var someNewValue = { name: option.name, newProperty: 'Foo' }
    //    filtered.push(someNewValue);
    // }
    return filtered;
  }, []);

  const sortedPokes = typePokes.filter(pokemon => {
    return allPokes.find(x => x.name === pokemon.pokemon.name)
  });

  console.log(newPokes)

  return sortedPokes  
}


function fetchAllPokesAjaxCall (defaultSort, dispatch) {
  dispatch({type:types.REQUEST_ALL_POKES})

  axios.get('https://pokeapi.co/api/v2/pokemon?limit=10')
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

function fetchTypePokesAjaxCall (type, allPokes, dispatch) {
  dispatch({ type: types.CHANGE_POKE_TYPE, data: type })

  axios.get(`https://pokeapi.co/api/v2/type/${type}`)
  .then((resp) => {
    const sortedPokes = getTypePokes(allPokes, resp.data.pokemon)

    console.log(sortedPokes)

    dispatch({ type:types.RECEIVED_ALL_POKES_SUCCESS, data: sortedPokes })
  })
  .catch((resp) => {
    const msg = types.COULD_NOT_GET_SELECTED_POKE
    // dispatch({ type: types.RECEIVED_SELECTED_POKE_FAILURE, data: {msg: msg, failedCall: 'fetch poke types'} })
  })
}