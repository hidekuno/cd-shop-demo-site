import {ADD_ITEM, DEL_ITEM, CLEAR_ITEMS} from "./reducers"

export const addToCart = (id, title, price, imageUrl) => ({
  type: ADD_ITEM,
  payload: {
    id,
    title,
    price,
    imageUrl,
  },
})

export const delToCart = (item) => ({
  type: DEL_ITEM,
  payload: item,
})
export const clearToCart = () => ({
  type: CLEAR_ITEMS,
  payload: {},
})
