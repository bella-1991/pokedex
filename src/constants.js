import keyMirror from 'keymirror'

/*
 * URLs
 */

export const URLS = {
    POKE_GENERATIONS: 'https://pokeapi.co/api/v2/generation/',
    ALL_POKEMON: 'https://pokeapi.co/api/v2/pokemon',
    POKE_LIMIT: 151,
    POKE_TYPES: 'https://pokeapi.co/api/v2/type/'
}

/*
 * Defaults
 */

export const DefaultFilters = {
    GEN: 'generation-i',
    TYPE: 'all',
    SORT: 'REL',
    RPP: 10,
    PAGE: 1,
    ALL: 'all'
}

/*
 * Actions
 */
export const ActionTypes = keyMirror({
    REQUEST_ALL_POKES: null,
    RECEIVED_ALL_POKES_SUCCESS: null,
    RECEIVED_ALL_POKES_FAILURE: null,
    REQUEST_POKE_TYPES: null,
    RECEIVED_POKE_TYPES_SUCCESS: null,
    RECEIVED_POKE_TYPES_FAILURE: null,
    CHANGE_POKE_TYPE: null,
    REQUEST_SORT_TYPE_CHANGE: null,
    REQUEST_SELECTED_POKE: null,
    RECEIVED_SELECTED_POKE_SUCCESS: null,
    RECEIVED_SELECTED_POKE_FAILURE: null,
    CLEAR_POKE: null,
    REQUEST_SORTED_POKES_SUCCESS: null,
    RECEIVED_SORTED_POKES_SUCCESS: null,
    REQUEST_MORE_POKES: null,
    RECEIVED_MORE_POKES_SUCCESS: null,
    RECEIVED_MORE_POKES_FAILURE: null,
    RECEIVED_MORE_SORTED_POKES_SUCCESS: null,
    RECEIVED_MORE_SORTED_POKES_FAILURE: null,
    NO_SORTED_POKES_FOUD: null,
    REQUEST_POKE_GENERATIONS: null,
    RECEIVED_POKE_GENERATIONS_SUCCESS: null,
    RECEIVED_POKE_GENERATIONS_FAILURE: null,
    REQUEST_EACH_POKE_GENERATION: null,
    RECEIVED_EACH_POKE_GENERATION_SUCCESS: null,
    RECEIVED_EACH_POKE_GENERATION_FAILURE: null,
    CHANGE_GEN_TYPE: null,
    REQUEST_RPP_CHANGE: null,
    ADD_TYPE_LIST: null,
    REMOVE_TYPE_LIST: null
})

/*
 * Errors
 */
export const Labels = {
    COULD_NOT_GET_POKE_GENERATIONS: 'Could not get Poke generations. Please try again',
    NO_POKES_FOUND: 'No Pokes found. Please try again',
    COULD_NOT_GET_POKES: "Could not find any Pokes. Please try again",    
    COULD_NOT_GET_SELECTED_POKE: 'Could not get selected poke details. Please try again',
    COULD_NOT_GET_POKE_TYPES: "Could not find any Poke Types. Please try again",
}