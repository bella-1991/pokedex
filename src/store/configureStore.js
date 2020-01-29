import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from '../reducers/index'

const logger = createLogger({
    collapsed: true
})

// store
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)


export default store