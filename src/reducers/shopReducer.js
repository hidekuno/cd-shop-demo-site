'use strict'

export const CHANGE_ITEM_LIST = 'CHANGE_ITEM_LIST'

export const shopReducer = (state, action) => {
  switch (action.type) {
  case CHANGE_ITEM_LIST:
    return { jsonfile: action.payload.jsonfile }

  default:
    throw new Error('No such action type')
  }
}
