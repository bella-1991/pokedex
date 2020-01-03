import keyMirror from 'keymirror'

export var ActionTypes = keyMirror({
    REQUEST_ALL_POKES: null,
    RECEIVED_ALL_POKES_SUCCESS: null,
    RECEIVED_ALL_POKES_FAILURE: null,
    COULD_NOT_GET_POKES: "Could not find any Pokes. Please try again later",
    REQUEST_POKE_TYPES: null,
    RECEIVED_POKE_TYPES_SUCCESS: null,
    RECEIVED_POKE_TYPES_FAILURE: null,
    COULD_NOT_GET_POKE_TYPES: "Could not find any Poke Types. Please try again later",
    CHANGE_POKE_TYPE: null,
    CHANGE_SORT_TYPE: null,
    REQUEST_SELECTED_POKE: null,
    RECEIVED_SELECTED_POKE_SUCCESS: null,
    RECEIVED_SELECTED_POKE_FAILURE: null,
    COULD_NOT_GET_SELECTED_POKE: 'Could not get selected poke details. Please try again later',
    CLEAR_POKE: null,
    REQUEST_SORT_POKES: null,
    RECEIVED_SORTED_POKES: null
})