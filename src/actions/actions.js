import axios from 'axios'
import debounce from 'lodash.debounce'

import { ActionTypes as types } from '../constants'

export function fetchAllPokes() {
    return (dispatch) => {
        fetchAllPokesAjaxCall(dispatch)
    }
}

function fetchAllPokesAjaxCall (dispatch) {
    dispatch({type:types.REQUEST_ALL_POKES})
  
    // ajax call for country details by given name
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`)
    .then((resp) => {
      dispatch({type:types.RECEIVED_ALL_POKES_SUCCESS, data: resp.data})
    })
    .catch((resp) => {
      const msg = getErrorMsg(resp)
      dispatch({type:types.RECEIVED_ALL_POKES_FAILURE, data: {msg: msg, failedCall: 'fetch pokes'}})
    })
  }

  /*******************
 * HELPERS
 *******************/
function getErrorMsg(resp) {
  var msg = 'Error. Please try again later.'

  if (resp && resp.request && resp.request.status === 0) {
    msg = 'Oh no! App appears to be offline.'
  }

  return msg
}