import { ActionTypes as types, DefaultFilters as defaultValues } from '../constants';

var defaultState = {
    allPokes: [],
    pokeOfType: [],
    selectedPoke: null,
    overlay: false,
    // defaultSort: 'ASCE',
    // defaultType: 'ALL',
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
    pages: 1,
    morePokes: [],
    pokeError: '',
    filterOptions: {
        generations: [],
        types: [],
        sort: [{
            code: 'REL',
            value: 'Most Relavant'
        },{
            code: 'ASCE',
            value: 'Ascending'
        },{
            code: 'DESC',
            value: 'Descending'
        }],
        resultsPerPage: [{
            value: 'ALL'
        },{
            value: 10
        },{
            value: 20
        },{ 
            value: 50
        }, {
            value: 100
        }]
    }, 
    filters: {
        tempGen: [],
        defaultGeneration: defaultValues.GEN,
        defaultType: defaultValues.TYPE,
        defaultSort: defaultValues.SORT,
        defaultRPP: defaultValues.RPP,
        defaultPage: defaultValues.PAGE
    },
    results: {
        allPokes: []
    }
};

function pokeDexReducer(state = defaultState, action) {
    switch (action.type) {
        case (types.MODIFY_GEN_LIST):
            console.log(action.data)
            return {
                ...state,
                filters: {...state.filters, tempGen: [...state.filters.tempGen, action.data] },
            }
        case (types.REQUEST_RPP_CHANGE):
            return {
                ...state,
                filters: {...state.filters, defaultRPP: action.data},
                overlay: true
            }
        case (types.CHANGE_GEN_TYPE):
            return {
                ...state,
                filters: {...state.filters, defaultGeneration: action.data},
                overlay: true
            }
        case (types.RECEIVED_EACH_POKE_GENERATION_FAILURE):
            return {
                ...state,
                pokeError: action.data.msg,
                overlay: false,
            }
        case (types.RECEIVED_EACH_POKE_GENERATION_SUCCESS):
            return {
                ...state,
                // allPokes: action.data.pokemon,
                filterOptions: {...state.filterOptions, types: action.data.types},
                pokeError: '',
                overlay: false,
            }
        case (types.REQUEST_EACH_POKE_GENERATION):
            return {
                ...state,
                overlay: true,
            }
        case (types.RECEIVED_POKE_GENERATIONS_FAILURE):
            return {
                ...state,
                pokeError: action.data.msg,
                overlay: false,
            }
        case (types.RECEIVED_POKE_GENERATIONS_SUCCESS):
            return {
                ...state,
                filterOptions: {...state.filterOptions, generations: action.data},
                pokeError: '',
                overlay: false,
            }
        case (types.REQUEST_POKE_GENERATIONS):
            return {
                ...state,
                overlay: true,
            }
        case (types.NO_SORTED_POKES_FOUD):
            return {
                ...state,
                overlay: false,
                pokeError: action.data.msg
            }
        case (types.RECEIVED_MORE_SORTED_POKES_FAILURE):
            return {
                ...state,
                overlay: false,
                pokeError: action.data.msg
            }
        case (types.RECEIVED_MORE_SORTED_POKES_SUCCESS):
            return {
                ...state,
                morePokes: [...state.morePokes, action.data],
                overlay: false,
            }
        case (types.RECEIVED_MORE_POKES_FAILURE):
            return {
                ...state,
                overlay: false,
                pokeError: action.data.msg
            }
        case (types.RECEIVED_MORE_POKES_SUCCESS):
            return {
                ...state,
                morePokes: [...state.morePokes, action.data],
                overlay: false,
            }
        case (types.REQUEST_MORE_POKES):
            return {
                ...state,
                overlay: true,
                pages: action.data
            }
        case (types.RECEIVED_SORTED_POKES_FAILURE):
            return {
                ...state,
                overlay: false,
                pokeError: action.data.msg
            }
        case (types.RECEIVED_SORTED_POKES_SUCCESS):
            console.log(action.data)
            return {
                ...state,
                // allPokes: action.data.allPokes,
                results: action.data,
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
        case (types.REQUEST_SORT_TYPE_CHANGE):
            return {
                ...state,
                filters: {...state.filters, defaultSort: action.data},
                overlay: true
            }
        case (types.CHANGE_POKE_TYPE):
            return {
                ...state,
                filters: {...state.filters, defaultType: action.data },
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
                pokeOfType: action.data,
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
            return {
                ...state,
                // allPokes: action.data,
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