import { ActionTypes as types } from '../constants';

var defaultState = {
    allPokes: [],
    pokeTypes: [],
    selectedPoke: null,
    overlay: false,
    defaultSort: 'ASCE',
    defaultType: 'ALL',
    sortOptions: [
        {
            code: 'ASCE',
            value: 'Ascending'
        },
        {
            code: 'DESC',
            value: 'Descending'
        }
    ],
    pokeError: ''
};

function pokeDexReducer(state = defaultState, action) {
    switch (action.type) {
        case (types.RECEIVED_SORTED_POKES):
            return {
                ...state,
                allPokes: action.data,
                overlay: false,
                pokeError: ''
            }
        case (types.REQUEST_SORT_POKES):
            return {
                ...state,
                overlay: true
            }
        case (types.CLEAR_POKE):
            return {
                ...state,
                selectedPoke: null
            }
        case (types.RECEIVED_SELECTED_POKE_FAILURE):
            return {
                ...state,
                pokeError: action.data.msg,
                overlay: false
            }
        case (types.RECEIVED_SELECTED_POKE_SUCCESS):
            return {
                ...state,
                selectedPoke: action.data,
                overlay: false
            }
        case (types.REQUEST_SELECTED_POKE):
            return {
                ...state,
                overlay: true
            }
        case (types.CHANGE_SORT_TYPE):
            return {
                ...state,
                defaultSort: action.data.type
            }
        case (types.CHANGE_POKE_TYPE):
            return {
                ...state,
                defaultType: action.data.type
            }
        case (types.RECEIVED_POKE_TYPES_FAILURE):
            return {
                ...state,
                pokeError: action.data.msg,
                overlay: false
            }
        case (types.RECEIVED_POKE_TYPES_SUCCESS):
            return {
                ...state,
                pokeTypes: action.data,
                overlay: false,
                pokeError: ''
            }
        case (types.REQUEST_POKE_TYPES):
            return {
                ...state,
                overlay: true
            }
        case (types.RECEIVED_ALL_POKES_FAILURE):
            return {
                ...state,
                overlay: false,
                pokeError: action.data.msg
            }
        case (types.RECEIVED_ALL_POKES_SUCCESS):
            console.log(action)
            return {
                ...state,
                allPokes: action.data,
                overlay: false,
                pokeError: ''
            }
        case (types.REQUEST_ALL_POKES):
            return {
                ...state,
                overlay: true
            }
        default:
            return state
    }
}

export default pokeDexReducer