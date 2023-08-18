import {ADD_ITEM, DEL_ITEM, CLEAR_ITEMS, ADD_POINT, DEL_POINT} from './reducers'

export const addToCart = (item) => ({
  type: ADD_ITEM,
  payload: item,
})
export const delToCart = (item) => ({
  type: DEL_ITEM,
  payload: item,
})
export const clearToCart = () => ({
  type: CLEAR_ITEMS,
  payload: {},
})
export const addPoint = (point) => ({
  type: ADD_POINT,
  payload: {point},
})
export const delPoint = (point) => ({
  type: DEL_POINT,
  payload: {point},
})
