import { createStore } from 'redux'
import cartReducer from './reducers'

export const configureStore = () => createStore(cartReducer)
