import { ActionTypes as types } from '../constants';

var defaultState = {
    allPokes: [],
    pokeTypes: [],
    selectedPoke: null,
    overlay: false,
    defaultSort: 'ASCE',
    defaultType: 'ALL'
};

function pokeDexReducer(state = defaultState, action) {
    switch (action.type) {
        case (types.RECEIVED_ALL_POKES_SUCCESS):
            return {
                ...state,
                country: action.data,
                showCountry: false
            }
        default:
            return state
    }
}

export default pokeDexReducer